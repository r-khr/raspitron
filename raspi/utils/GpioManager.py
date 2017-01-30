""" Loader functions """

class GpioManager():
    """ GPIO Pin Manager """
    def __init__(self, GPIO):
        self.gpio = GPIO

    def get_pins_status(self, PINS):
        """ GPIO Pin Manager """
        return PINS

    def set_pins_status(self, PINS):
        """ GPIO Pin Manager """
        if self.gpio is not None:
            for _pin in PINS:
                self.gpio.setup(_pin['number'], self.gpio.OUT)
                self.gpio.output(_pin['number'], self.gpio.HIGH if _pin['state'] else self.gpio.LOW)



