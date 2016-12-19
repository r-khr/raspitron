""" Index server file """

from flask import Flask, render_template, request, jsonify
import RPi.GPIO as GPIO

APP = Flask(__name__)

GPIO.setmode(GPIO.BCM)

# Create a dictionary called pins to store the pin number, name, and pin state:
PINS = {
    4 : {
        'name': 'fan',
        'state': GPIO.LOW
    },
    14 : {
        'name' : 'light',
        'state' : GPIO.LOW
    }
}

# Set each pin as an output and make it low:
for _pin in PINS:
    GPIO.setup(_pin, GPIO.OUT)
    GPIO.output(_pin, GPIO.LOW)

@APP.route("/")
def main():
    """ Main template """
    # For each pin, read the pin state and store it in the pins dictionary:
    for pin in PINS:
        PINS[pin]['state'] = GPIO.input(pin)
    # Put the pin dictionary into the template data dictionary:
    template_data = {
        'pins' : PINS
    }
    # Pass the template data into the template main.html and return it to the user
    return render_template('main.html', **template_data)

# The function below is executed when someone requests a URL with the pin number and action in it:
@APP.route("/<pin_number>/<pin_action>")
def action(pin_number, pin_action):
    """ Change pin status template """
    # Convert the pin from the URL into an integer:
    pin_number = int(pin_number)
    # Get the device name for the pin being changed:
    device_name = PINS[pin_number]['name']
    # If the action part of the URL is "on," execute the code indented below:
    if pin_action == "on":
        # Set the pin high:
        GPIO.output(pin_number, GPIO.HIGH)
        # Save the status message to be passed into the template:
        message = "Turned " + device_name + " on."
    if pin_action == "off":
        GPIO.output(pin_number, GPIO.LOW)
        message = "Turned " + device_name + " off."
    if pin_action == "toggle":
        # Read the pin and set it to whatever it isn't (that is, toggle it):
        GPIO.output(pin_number, not GPIO.input(pin_number))
        message = "Toggled " + device_name + "."

    # For each pin, read the pin state and store it in the pins dictionary:
    for pin in PINS:
        PINS[pin]['state'] = GPIO.input(pin)

    # Along with the pin dictionary, put the message into the template data dictionary:
    template_data = {
        'message' : message,
        'pins' : PINS
    }

    return render_template('main.html', **template_data)

@APP.route("/status", methods=["GET"])
def status():
    """ Get pin status template """
    # For each pin, read the pin state and store it in the pins dictionary:
    for pin in PINS:
        PINS[pin]['state'] = GPIO.input(pin)
    # Put the pin dictionary into the template data dictionary:
    template_data = {
        'pins' : PINS
    }
    # Pass the template data into the template main.html and return it to the user
    return jsonify(**template_data)
    

if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=True)
