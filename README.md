# CI_W5

Mimi Yin NYU-ITP
Drawing skeleton joints and bones from Kinect.

Modified by Louise Lessél, NYU-ITP
To use OSC for p5.js based on Gene Kogan's https://github.com/genekogan/p5js-osc.
In order to choose to use either NI_mate or Kinectron

---------------------------

To switch between NI_mate (mac) or Kinectron (windows) skeleton,
change the variable "ni_mate"
- to false if using Kinectron
- to true if using ni_mate (plug the Kinect into your mac, and download free https://www.ni-mate.com/download/)
Make sure ni_mate is sending skeleton data as "Basic", turn off "Hand".


INSTRUCTIONS TO RUN:

In terminal:
- cd to path of folder you downloaded from github
- node bridge.js

Go to in chrome:
http://localhost:????      (I am not sure what port! SEE NOTE)

---------------------------
NOTE: The code works! HOWEVER one small chink!
For ni_mate use:
I have been using the "live preview" lightning icon (upper right corner of interface) in Brackets code editor (http://brackets.io) to run the code through. Make sure you are in the folder "Example" in Brackets before hitting that icon -> To do this: Drag the folder into Brackets.

I am not sure what port it is supposed to be output on on the browser yet. I would assume it's the same as in class (Localhost:8000 ), but it don't work  :D

---------------------------
