""" Index server file with GPIO Pins """

from flask import Flask, render_template, request, jsonify
import time
import schedule
import RPi.GPIO as GPIO
from utils.loader import Loader
from utils.scheduler import Scheduler

APP = Flask(__name__)

print "#---------------------------------------#"
print "#-------   STARTING RASPITRON   --------#"
print "#---------------------------------------#"

GPIO.setmode(GPIO.BCM)

loader = Loader()
PINS = loader.get()

# Create a dictionary called pins to store the pin number, name, and pin state:

print "--- Started Raspitron Server --- \n"
print "Running initial pin states"

# Set each pin as an output and make it low:
for _pin in PINS:
    GPIO.setup(_pin['number'], GPIO.OUT)
    GPIO.output(_pin['number'], GPIO.HIGH if _pin['state'] else GPIO.LOW)

print "--- Starting Scheduler ---"
scheduler = Scheduler(PINS, GPIO)
# Run scheduler
scheduler.start()


@APP.route("/status", methods=['GET'])
def status():
    """ Get pin status template """
    # For each pin, read the pin state and store it in the pins dictionary:
    for pin in PINS:
        pin_number = int(pin['number'])
        pin_state = GPIO.input(pin_number)
        if pin_state == GPIO.HIGH:
            pin['state'] = "True"
        else:
            pin['state'] = "False"
    # Put the pin dictionary into the template data dictionary:
    json_data = {
        'pins' : PINS
    }
    # Pass the template data into the template main.html and return it to the user
    return jsonify(**json_data)

@APP.route("/status/<pin_number>/<pin_action>", methods=['POST'])
def status_post(pin_number, pin_action):
    """ Change pin status template """
    pin_number = int(pin_number)
    if pin_action == "on":
        GPIO.output(pin_number, GPIO.HIGH)
    if pin_action == "off":
        GPIO.output(pin_number, GPIO.LOW)

    for pin in PINS:
        pin['state'] = GPIO.input(pin['number'])

    json_data = {
        'pins' : PINS
    }

    return jsonify(**json_data)

# @APP.route("/status/<pin_number>/<pin_action>", methods=['POST'])
# def post_pin_status(pin_number, pin_action):
#     """ Update pin status template """
#     pin_number = int(pin_number)

#     for pin in PINS:
#         if pin['number'] == pin_number:
#             if pin_action == "on":
#                 pin['state'] = 1
#                 GPIO.output(pin_number, GPIO.HIGH)
#             elif pin_action == "off":
#                 pin['state'] = 0
#                 GPIO.output(pin_number, GPIO.LOW)

#     template_data = {
#         'pins' : PINS
#     }
#     # Pass the template data into the template main.html and return it to the user
#     return jsonify(**template_data)

if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=True)
