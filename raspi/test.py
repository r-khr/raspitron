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
print "### Running initial pin states"
GPIO_MANAGER = GpioManager(None)
GPIO_MANAGER.start_pins()

print "### Starting Scheduler"
SCHEDULER = Scheduler(None)
SCHEDULER.start()

print "### Started Raspitron Server"

@APP.route("/pins", methods=['GET'])
def get_pins():
    """ Get pins and their status """
    pins = GPIO_MANAGER.get_pins()

    return jsonify({
        'pins' : pins
    })

@APP.route("/pins", methods=['POST'])
def post_pins():
    """ Update pins and their status """
    received_pins = request.get_json()
    pins = GPIO_MANAGER.set_pins(received_pins)

    return jsonify({
        'pins' : pins
    })

@APP.route("/rules", methods=['GET'])
def get_rules():
    """ Get rules """
    rules = SCHEDULER.get_rules()

    return jsonify({
        'rules' : rules
    })

@APP.route("/rules", methods=['POST'])
def post_rules():
    """ Update rules """
    received_rules = request.get_json()
    rules = SCHEDULER.set_rules(received_rules)

    return jsonify({
        'rules' : rules
    })

if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=False)
