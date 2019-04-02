# CI_W5

Mimi Yin NYU-ITP
Drawing skeleton joints and bones from Kinect.

Modified by Louise Lessél, NYU-ITP
In order to choose to use either NI Mate or Kinectron.
For the class Choreographic Interventions, ITP Spring 2019

---------------------------

OSC implementation based on OSC for p5.js by Gene Kogan https://github.com/genekogan/p5js-osc.
Read more about it in Applications.md file.

---------------------------

This implementation uses Node.js in p5 to recieve OSC. So start by setting that up.


#### setup

1) install [node](https://nodejs.org/)

2) In terminal:
- cd to path of folder you downloaded from github 
- npm install

Dependencies:
To plug the Kinect2 (Kinect for Xbox One) into your mac, and get skeleton data via OSC, download the free NI Mate here: https://www.ni-mate.com/download/

To use a windows computer as a server for Kinect (and see the output on any computer using this code), have a look at Kinectron: https://kinectron.github.io

Make sure you have node.js installed on your computer to run on a Mac https://nodejs.org/en/.

---------------------------

INSTRUCTIONS TO RUN
Using NI Mate

Open NI Mate on your Mac. Plug in Kinect. Make sure NI Mate is sending skeleton OSC data as "Basic", for just a single user, and turn off "Hand". Make sure it sends on 127.0.0.1 and port 7000.

In terminal:
- cd to path of folder you downloaded from github
- node bridge.js

Drag the index.html file into a browser window (e.g Google Chrome)

---------------------------

INSTRUCTIONS TO RUN
Using Kinectron

Make sure a computer on the same local network is running Kinectron.

Change to the correct IP adress in sketch.js on this line: kinectron = new Kinectron("xx.xx.xx.xx")

In Terminal:
- cd to path of folder you downloaded from github
- python -m http.server 8000

Open browser window (e.g Google Chrome)
- Go to Localhost:8000 

---------------------------

To switch between NI Mate (mac) or Kinectron (windows) skeleton:

Change the variable "ni_mate" which you find in the file sketch.js
- change to false if using Kinectron
- change to true if using NI Mate

All code will work for both frameworks (but one at a time). 
Enjoy make more visuals!

Try modifying the function distanceCoolness(_start, _end) {}

---------------------------