""" Index server file with GPIO Pins """

from flask import Flask, request, jsonify
import RPi.GPIO as GPIO
from utils.FileManager import FileManager
from utils.Scheduler import Scheduler

APP = Flask(__name__)

print "#---------------------------------------#"
print "#-------   STARTING RASPITRON   --------#"
print "#---------------------------------------#"

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

FILE_MANAGER = FileManager()
PINS = FILE_MANAGER.get()

# Create a dictionary called pins to store the pin number, name, and pin state:

print "--- Started Raspitron Server ---"
print "Running initial pin states"

# Set each pin as an output and make it low:
for _pin in PINS:
    GPIO.setup(_pin['number'], GPIO.OUT)
    GPIO.output(_pin['number'], GPIO.HIGH if _pin['state'] else GPIO.LOW)

print "--- Starting Scheduler ---"
SCHEDULER = Scheduler(PINS, GPIO)
# Run scheduler
SCHEDULER.start()

@APP.route("/status", methods=['GET'])
def status():
    """ Get pin status template """
    return jsonify({
        'pins' : FILE_MANAGER.get()
    })

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

if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=False)
