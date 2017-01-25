""" Loader functions """
import json
import os

class Loader():
    def __init__(self):
        self.location = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
        self.pin_path = os.path.join(self.location, '../data/pins.json')

    def pins(self):
        """ Function for loading pins """
        # Create a dictionary called pins to store the pin number, name, and pin state:
        with open(self.pin_path) as data_file:
            json_data = json.load(data_file)

        return json_data

