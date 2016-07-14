#!/usr/bin/python

import RPi.GPIO as GPIO
import time
from subprocess import call

GPIO.setmode(GPIO.BCM)

BUTTON = 18;

GPIO.setup(BUTTON, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
    input_state = GPIO.input(BUTTON)
    if input_state == False:
        print('Button Pressed')
        call(["node", "./index.js"])
        time.sleep(1)
