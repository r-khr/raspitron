""" Loader functions """
from FileManager import FileManager

class GpioManager():
    """ GPIO Pin Manager """
    def __init__(self, gpio):
        self.gpio = gpio
        self.file = FileManager()

    def start_pins(self):
        """ Use when starting application. """
        pins = self.file.getPins()
        if self.gpio is not None:
            for pin in pins:
                self.gpio.setup(pin['number'], self.gpio.OUT)
                self.gpio.output(pin['number'], pin['state'])
        return pins

    def get_current_pins_status(self):
        """ Use when checking current pin status. """
        pins = self.file.getPins()
        return self.gpio_pins_status(pins)

    def set_pin_status_and_save(self, pin_number, set_to):
        """ Use when scheduler setting pin to a state.
        # When the scheduler sets a pin to its new status,
        # we want to save this as current status in data file.
        """
        # Get Pins from saved file
        pins = self.file.getPins()

        if self.gpio is not None:
            # Set GPIO Pin Status
            self.gpio.output(pin_number, set_to)

        # Test Pins against GPIO or Update Pin Collection
        updated_pins = self.set_gpio_pins_status(pins, pin_number, set_to)
        # Save GPIO pins into data file
        self.file.savePins(updated_pins)

    def set_pins_and_save(self, pins):
        """ Use when sending server updated pins """
        self.file.savePins(pins)
        if self.gpio is not None:
            for pin in pins:
                self.gpio.output(pin['number'], pin['state'])

        return pins

    # Below are functions intended to be used as helpers.
    def gpio_pins_status(self, pins):
        """ TEST Group of Pin Status in GPIO """
        if self.gpio is not None:
            for pin in pins:
                pin['state'] = self.get_gpio_pin_status(pin)

        return pins

    def set_gpio_pins_status(self, pins, pin_number, set_to):
        """ TEST Group of Pin Status in GPIO
        # or Update Pin Collection if GPIO not present
        """
        for pin in pins:
            if self.gpio is not None:
                pin['state'] = self.get_gpio_pin_status(pin)
            else:
                pin['state'] = self.set_pin_status(pin, pin_number, set_to)

        return pins

    def get_gpio_pin_status(self, pin):
        """ TEST Single Pin Status in GPIO """
        pin_number = int(pin['number'])
        pin_state = self.gpio.input(pin_number)

        return bool(pin_state == self.gpio.HIGH)

    def set_pin_status(self, pin, pin_number, set_to):
        """ Return Pin Status """
        if int(pin['number']) == pin_number:
            return set_to

        return pin['state']

