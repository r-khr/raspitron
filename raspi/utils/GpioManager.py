""" Loader functions """

from FileManager import FileManager

class GpioManager():
    """ GPIO Pin Manager """
    def __init__(self, GPIO):
        self.gpio = GPIO
        self.file = FileManager()

    def get_pins_status(self):
        """ GPIO Pin Manager """
        pins = self.file.get()

        for pin in pins:
            pin_number = int(pin['number'])
            pin_state = self.gpio.input(pin_number)
            pin['state'] = bool(pin_state == self.gpio.HIGH)
        return pins

    def set_pins_status(self, PINS):
        """ GPIO Pin Manager """
        if self.gpio is not None:
            for _pin in PINS:
                self.gpio.setup(_pin['number'], self.gpio.OUT)
                self.gpio.output(_pin['number'], self.gpio.HIGH if _pin['state'] else self.gpio.LOW)



