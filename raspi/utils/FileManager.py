""" Loader functions """
import json
import os

class FileManager():
    """ Pin File Manager """
    def __init__(self):
        self.location = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
        self.pin_path = os.path.join(self.location, '../data/pins.json')
        self.rule_path = os.path.join(self.location, '../data/rules.json')

    def getPins(self):
        """ Function for loading pins to file """
        # Create a dictionary called pins to store the pin number, name, and pin state:
        with open(self.pin_path) as data_file:
            json_data = json.load(data_file)

        print "Loaded PINS from file -> pins.json \n"

        return json_data

    def savePins(self, data):
        """ Function for saves pins to file """
        with open(self.pin_path, 'w') as outfile:
            json.dump(data, outfile)

    def getRules(self):
        """ Function for loading rules to file """
        # Create a dictionary called pins to store the pin number, name, and pin state:
        with open(self.rule_path) as data_file:
            json_data = json.load(data_file)

        print "Loaded Rules from file -> rules.json \n"

        return json_data

    def saveRules(self, data):
        """ Function for saves rules to file """
        with open(self.rule_path, 'w') as outfile:
            json.dump(data, outfile)
