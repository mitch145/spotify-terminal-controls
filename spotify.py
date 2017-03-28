#!/usr/bin/env python

import subprocess, os, time

artist = ""
track = ""
oldArtist = ""
oldTrack = ""

while True:
    artist = subprocess.check_output("osascript artist.applescript", shell=True).strip()
    track = subprocess.check_output("osascript track.applescript", shell=True).strip()
    if artist != oldArtist or track != oldTrack:
        os.system("clear")
        print artist + " - " + track
    oldArtist = artist
    oldTrack = track
    time.sleep(1)

