#!/usr/bin/env python

import subprocess, os, sys, time, threading


def print_track():
    artist = ""
    track = ""
    old_artist = ""
    old_track = ""
    while True:
        artist = str(subprocess.check_output("osascript artist.applescript", shell=True, universal_newlines=True).strip())
        track = str(subprocess.check_output("osascript track.applescript", shell=True, universal_newlines=True).strip())
        if artist != old_artist or track != old_track:
            print_interface()
        old_artist = artist
        old_track = track

def command_event_listener():
    while True:
        command = input("")
        if command == "n":
            next_track()
        if command == "p":
            previous_track()
        if command == "q":
            print("")
            os.system("clear")
            print("Goodbye :(")
            os._exit(1)
        print_interface()

def print_interface():
    artist = str(subprocess.check_output("osascript artist.applescript", shell=True, universal_newlines=True).strip())
    track = str(subprocess.check_output("osascript track.applescript", shell=True, universal_newlines=True).strip())
    print("")
    os.system("clear")
    print(artist + " - " + track)
    print("Command: ", end="", flush=True)

def next_track():
    os.system("osascript next.applescript")
def previous_track():
    os.system("osascript previous.applescript")


# Initialise threading
thread1 = threading.Thread(target=print_track)
thread2 = threading.Thread(target=command_event_listener)

thread1.start()
thread2.start()
