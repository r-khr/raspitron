""" Loader functions """
import json
import os

class Loader():
    def __init__(self):
        self.location = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
        self.pin_path = os.path.join(self.location, '../data/pins.json')

    def get(self):
        """ Function for loading pins to file """
        # Create a dictionary called pins to store the pin number, name, and pin state:
        with open(self.pin_path) as data_file:
            json_data = json.load(data_file)

        print "Loaded PINS from file -> pins.json \n"

        return json_data

    def save(self, data):
        """ Function for saves pins to file """
        with open(self.pin_path, 'w') as outfile:
            json.dump(data, outfile)
