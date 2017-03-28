#!/usr/bin/env python3

import subprocess, os, sys, time, threading


def print_track():
    artist = ""
    track = ""
    old_artist = ""
    old_track = ""
    while True:
        artist = subprocess.check_output("osascript artist.applescript", shell=True).strip()
        track = subprocess.check_output("osascript track.applescript", shell=True).strip()
        if artist != old_artist or track != old_track:
            print_interface()
        old_artist = artist
        old_track = track

def command_event_listener():
    while True:
        command = raw_input("")
        if command == "n":
            next_track()
        if command == "p":
            previous_track()
        if command == "q":
            print ""
            os.system("clear")
            print "Goodbye :("
            os._exit(1)
        print_interface()

def print_interface():
    artist = subprocess.check_output("osascript artist.applescript", shell=True).strip()
    track = subprocess.check_output("osascript track.applescript", shell=True).strip()
    print ""
    os.system("clear")
    print artist + " - " + track
    print "Command: ",

def next_track():
    os.system("osascript next.applescript")
def previous_track():
    os.system("osascript previous.applescript")


# Initialise threading
thread1 = threading.Thread(target=print_track)
thread2 = threading.Thread(target=command_event_listener)

thread1.start()
thread2.start()
