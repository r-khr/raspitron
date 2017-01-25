""" Test Server File without GPIO Pins """

from flask import Flask, render_template, request, jsonify
import time
import json
import os
import schedule

APP = Flask(__name__)

# Current File Location
__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

# Create a dictionary called pins to store the pin number, name, and pin state:
with open(os.path.join(__location__, 'pins.json')) as data_file:
    JSON_DATA = json.load(data_file)

PINS = JSON_DATA['PINS']

print "--- Started Raspitron Server --- \n"
print "Running initial pin states"

for _pin in PINS:
    print '---'
    print '  Pin Number: ' + str(_pin['number'])
    print '  Pin Name: "' + _pin['name'] + '"'


def job(pin_number, action_time, set_to):
    """ Scheduler """
    gpio = 'GPIO.LOW' if set_to else 'GPIO.HIGH'
    print 'At ' + action_time + ' set pin #' + str(pin_number) + ' to ' + gpio

def scheduler():
    """ Function for schedule """
    schedule.clear()

    for _pin in PINS:
        if len(_pin['rules']) > 0:
            for rule in _pin['rules']:
                _num = _pin['number']
                _time = rule['time']
                _set = rule['setTo']
                schedule.every().day.at(_time).do(job, _num, _time, _set)

    while True:
        schedule.run_pending()
        time.sleep(1)

# Run scheduler
scheduler()


@APP.route("/status", methods=['GET'])
def get_status():
    """ Get pin status template """
    template_data = {
        'pins' : PINS
    }
    return jsonify(**template_data)

@APP.route("/status/<pin_number>/<pin_action>", methods=['POST'])
def post_status(pin_number, pin_action):
    """ Update pin status template """
    pin_number = int(pin_number)
    pin_value = 0

    for pin in PINS:
        if pin['number'] == pin_number:
            if pin_action == "on":
                pin['state'] = 1
            elif pin_action == "off":
                pin['state'] = 0

    template_data = {
        'pins' : PINS
    }
    # Pass the template data into the template main.html and return it to the user
    return jsonify(**template_data)


if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=True)
