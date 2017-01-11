""" Test Server File without GPIO Pins """

from flask import Flask, render_template, request, jsonify

APP = Flask(__name__)

# Create a dictionary called pins to store the pin number, name, and pin state:
PINS = [
    {
        'number': 1,
        'name': 'GPIO 01',
        'state': 0
    },
    {
        'number': 2,
        'name': 'GPIO 02',
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
