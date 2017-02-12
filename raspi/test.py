""" Test Server File without GPIO Pins """

import time
from flask import Flask, request, jsonify
from utils.GpioManager import GpioManager
from utils.Scheduler import Scheduler

APP = Flask(__name__)

print "#---------------------------------------#"
print "#-------   STARTING RASPITRON   --------#"
print "#---------------------------------------#"

# Get Pins from GpioManager
print "--- Running initial pin states ---"
GPIO_MANAGER = GpioManager(None)
PINS = GPIO_MANAGER.start_pins()

print "--- Starting Scheduler ---"
SCHEDULER = Scheduler(PINS, None)
SCHEDULER.start()

print "--- Started Raspitron Server ---"

@APP.route("/status", methods=['GET'])
def get_status():
    """ Get pins and their status """
    pins = GPIO_MANAGER.get_current_pins_status()

    return jsonify({
        'pins' : pins
    })

@APP.route("/status", methods=['POST'])
def post_status():
    """ Update pins and their status """
    recieved_pins = request.get_json()
    pins = GPIO_MANAGER.set_pins_and_save(recieved_pins)
    SCHEDULER.run_scheduler(pins)
    return jsonify({
        'pins' : pins
    })

if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=False)
