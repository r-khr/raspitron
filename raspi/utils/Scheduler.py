""" Scheduler functions """
from threading import Thread
import time
import schedule
from GpioManager import GpioManager

class Scheduler(Thread):
    """ Scheduler Thread Class """
    def __init__(self, PINS, GPIO):
        Thread.__init__(self)
        self.pins = PINS
        self.manager = GpioManager(GPIO)
        self.daemon = True

    def job(self, pin_number, action_time, set_to):
        """ Scheduler Job """
        sched_str = 'Scheduled Action --- ' + action_time
        sched_str += ' set pin #' + str(pin_number) + ' to ' + str(set_to)
        print sched_str

        self.manager.set_pin_status_and_save(pin_number, set_to)

    def run(self):
        self.run_scheduler(self.pins)

        while True:
            schedule.run_pending()
            time.sleep(1)

    def run_scheduler(self, pins):
        """ Function for schedule """
        # Clear Existing Schedule
        schedule.clear()

        # Go through pins and generate new schedule
        for pin in pins:
            if len(pin['rules']) > 0:
                for rule in pin['rules']:
                    _num = pin['number']
                    _time = rule['time']
                    _set = rule['setTo']
                    schedule.every().day.at(_time).do(self.job, _num, _time, _set)
