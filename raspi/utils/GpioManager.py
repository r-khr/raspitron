""" Loader functions """
from FileManager import FileManager

class GpioManager(object):
    """ GPIO Pin Manager """
    def __init__(self, gpio):
        self.gpio = gpio
        self.file = FileManager()

    def start_pins(self):
        """ Initialize saved pins onto GPIO """
        pins = self.file.get_pins()
        if self.gpio is not None:
            for pin in pins:
                self.gpio.setup(pin['number'], self.gpio.OUT)
                self.gpio.output(pin['number'], pin['state'])

    def get_pins(self):
        """ External get pins function """
        pins = self.file.get_pins()
        return self.get_gpio_pins(pins)

    def set_pins(self, pins):
        """ External set collection of pins function """
        self.file.save_pins(pins)
        return self.set_gpio_pins(pins)

    def set_pin(self, pin_number, set_to):
        """ External set single pin """
        pins = self.file.get_pins()

        for pin in pins:
            if pin['pin_number'] == pin_number:
                pin['state'] = bool(set_to)

        pins = self.get_gpio_pins(pins)
        self.file.save_pins(pins)

    def set_gpio_pins(self, pins):
        """ Set status of pins on GPIO """
        if self.gpio is not None:
            for pin in pins:
                self.gpio.output(int(pin['pin_number']), bool(pin['state']))
        return pins

    def get_gpio_pins(self, pins):
        """ Get status of pins on GPIO """
        if self.gpio is not None:
            for pin in pins:
                pin_number = int(pin['pin_number'])
                pin_gpio_state = self.gpio.input(pin_number)
                pin['state'] = bool(pin_gpio_state == self.gpio.HIGH)
        return pins


