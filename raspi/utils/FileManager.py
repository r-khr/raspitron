""" Loader functions """
import json
import os

class FileManager(object):
    """ Pin File Manager """
    def __init__(self):
        self.location = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
        self.pin_path = os.path.join(self.location, '../data/pins.json')
        self.rule_path = os.path.join(self.location, '../data/rules.json')

    def get_pins(self):
        """ Function for loading pins to file """
        # Create a dictionary called pins to store the pin number, name, and pin state:
        with open(self.pin_path) as data_file:
            json_data = json.load(data_file)
        print "FILE [pins.json] -> DATA [pins] \n"
        return json_data

    def save_pins(self, data):
        """ Function for saves pins to file """
        with open(self.pin_path, 'w') as outfile:
            json.dump(data, outfile)
        print "DATA [pins] -> FILE [pins.json] \n"

    def get_rules(self):
        """ Function for loading rules to file """
        # Create a dictionary called pins to store the pin number, name, and pin state:
        with open(self.rule_path) as data_file:
            json_data = json.load(data_file)
        print "FILE [rules.json] -> DATA [rules] \n"
        return json_data

    def save_rules(self, data):
        """ Function for saves rules to file """
        with open(self.rule_path, 'w') as outfile:
            json.dump(data, outfile)
        print "DATA [rules] -> FILE [rules.json] \n"
