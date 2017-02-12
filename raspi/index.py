""" Index server file with GPIO Pins """

from flask import Flask, request, jsonify
import RPi.GPIO as GPIO
from utils.GpioManager import GpioManager
from utils.Scheduler import Scheduler

APP = Flask(__name__)
GPIO_MANAGER = GpioManager(GPIO)

print "#---------------------------------------#"
print "#-------   STARTING RASPITRON   --------#"
print "#---------------------------------------#"

# GPIO Preset
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

print "--- Running initial pin states ---"
PINS = GPIO_MANAGER.start_pins()

print "--- Starting Scheduler ---"
SCHEDULER = Scheduler(PINS, GPIO)
SCHEDULER.start()

print "--- Started Raspitron Server ---"

@APP.route("/status", methods=['GET'])
def status():
    """ Get pins and their status """
    pins = GPIO_MANAGER.get_current_pins_status()

    return jsonify({
        'pins' : pins
    })

@APP.route("/status", methods=['POST'])
def status_post():
    """ Update pins and their status """
    recieved_pins = request.get_json()
    pins = GPIO_MANAGER.set_pins_and_save(recieved_pins)
    SCHEDULER.run_scheduler(pins)
    return jsonify(**{
        'pins' : pins
    })

if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=False)
