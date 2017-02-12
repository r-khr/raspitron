""" Scheduler functions """
from threading import Thread
import time
import schedule
from GpioManager import GpioManager
from FileManager import FileManager

class Scheduler(Thread):
    """ Scheduler Thread Class """
    def __init__(self, GPIO):
        Thread.__init__(self)
        self.manager = GpioManager(GPIO)
        self.file = FileManager()
        self.daemon = True

    def job(self, pin_number, action_time, set_to):
        """ Scheduler Job """
        sched_str = 'Scheduled Action --- ' + action_time
        sched_str += ' set pin #' + str(pin_number) + ' to ' + str(set_to)
        print sched_str

        self.manager.set_pin(pin_number, set_to)

    def run(self):
        rules = self.file.get_rules()
        self.run_scheduler(rules)

        while True:
            schedule.run_pending()
            time.sleep(1)

    def run_scheduler(self, rules):
        """ Function for schedule """
        # Clear Existing Schedule
        schedule.clear()

        # Go through pins and generate new schedule
        for rule in rules:
            _num = rule['pin_number']
            _time = rule['time']
            _set = rule['set_to']
            schedule.every().day.at(_time).do(self.job, _num, _time, _set)

    def get_rules(self):
        """ External get rules function """
        rules = self.file.get_rules()
        return rules

    def set_rules(self, rules):
        """ External get rules function """
        rules = self.file.save_rules(rules)
        self.run_scheduler(rules)
        return rules
