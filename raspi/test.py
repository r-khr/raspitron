""" Test Server File without GPIO Pins """

from flask import Flask, render_template, request, jsonify

APP = Flask(__name__)

# Create a dictionary called pins to store the pin number, name, and pin state:
PINS = [
    {
        'number': 4,
        'name': 'GPIO04',
        'state': 0
    },
    {
        'number': 14,
        'name': 'GPIO14',
        'state': 0
    },
    {
        'number': 15,
        'name': 'GPIO15',
        'state': 0
    },
    {
        'number': 17,
        'name': 'GPIO17',
        'state': 0
    },
    {
        'number': 18,
        'name': 'GPIO18',
        'state': 0
    }
]

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

    if pin_action == "on":
        pin_value = 1
    elif pin_action == "off":
        pin_value = 0

    for pin in PINS:
        if pin['number'] == pin_number:
            pin['state'] = pin_value

    template_data = {
        'pins' : PINS
    }
    # Pass the template data into the template main.html and return it to the user
    return jsonify(**template_data)


if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=True)
