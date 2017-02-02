""" Test Server File without GPIO Pins """

from flask import Flask, request, jsonify
from utils.FileManager import FileManager
from utils.Scheduler import Scheduler

APP = Flask(__name__)

print "#---------------------------------------#"
print "#-------   STARTING RASPITRON   --------#"
print "#---------------------------------------#"

FILE_MANAGER = FileManager()
PINS = FILE_MANAGER.get()
SCHEDULER = Scheduler(PINS, None)

# Run scheduler
SCHEDULER.start()

@APP.route("/status", methods=['GET'])
def get_status():
    """ Get pin status template """
    return jsonify({
        'pins' : PINS
    })

@APP.route("/status", methods=['POST'])
def post_status():
    """ Update pin status template """
    # Update Pin Status
    

    # Save New Pin Data
    FILE_MANAGER.save(request.data)

    # Pass the template data into the template main.html and return it to the user
    return jsonify({
        'pins' : request.data
    })


if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=True)
