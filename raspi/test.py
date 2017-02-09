""" Test Server File without GPIO Pins """

from flask import Flask, request, jsonify
from utils.GpioManager import GpioManager
from utils.Scheduler import Scheduler

APP = Flask(__name__)

print "#---------------------------------------#"
print "#-------   STARTING RASPITRON   --------#"
print "#---------------------------------------#"

# Get Pins from GpioManager
GPIO_MANAGER = GpioManager(None)
PINS = GPIO_MANAGER.start_pins()

# Run scheduler
SCHEDULER = Scheduler(PINS, None)
SCHEDULER.start()

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
    pins = GPIO_MANAGER.set_pins_and_save(request.data)

    return jsonify({
        'pins' : pins
    })


if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=True)
