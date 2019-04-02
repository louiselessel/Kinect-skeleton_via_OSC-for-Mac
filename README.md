# Kinect skeleton via NI_Mate or Kinectron in p5.js, using OSC

Mimi Yin NYU-ITP
Drawing skeleton joints and bones from Kinect v2 (Kinect for Xbox One).
Made for the class [Choreographic Interventions](https://github.com/mimiyin/choreographic-interventions-s19/), ITP, NYU, Spring 2019

Modified by Louise Lessél, NYU-ITP
You can use either NI Mate (Kinect for Mac) or Kinectron (Kinect for Windows).

There is also a [Processing version of this code using just NI Mate](https://github.com/mimiyin/choreographic-interventions-s19/wiki/Delicode-NI-Mate).

---------------------------

OSC implementation based on OSC for p5.js by Gene Kogan https://github.com/genekogan/p5js-osc.
Read more about it in Applications.md file.

---------------------------

## Dependencies:
### Kinect for Mac
To plug the Kinect2 (Kinect for Xbox One) directly into your mac, and get skeleton data via OSC, download the free NI Mate here: https://www.ni-mate.com/download/

Then set up OSC using Node.js in p5.

#### setup OSC

1) install [node](https://nodejs.org/)

2) In terminal:
- cd to path of folder you downloaded from github 
- npm install

### Kinect for Windows
To use a windows computer as a server for Kinect have a look at how to set up Kinectron: https://kinectron.github.io. Kinectron allows you to see the output from the Kinect on any computer using the code in my repo.


---------------------------

#### INSTRUCTIONS TO RUN Using NI Mate

Open NI Mate on your Mac. Plug in Kinect. Make sure NI Mate is sending skeleton OSC data as "Basic", for just a single user, and turn off "Hand". Make sure it sends on 127.0.0.1 and port 7000.

In terminal:
- cd to path of folder you downloaded from github
- node bridge.js

Drag the index.html file into a browser window (e.g Google Chrome)

Remember to close connection again when you are done: CTRL + C

---------------------------

#### INSTRUCTIONS TO RUN Using Kinectron

Make sure a Windows computer on the same local network is running [Kinectron](https://kinectron.github.io.).

Open the file sketch.js on a windows or Mac computer.
Change the current IP address in sketch.js on this line: kinectron = new Kinectron("xx.xx.xx.xx")
to the IP of the computer running Kinectron.

In Terminal:
- cd to path of folder you downloaded from github
- python -m http.server 8000

Open browser window (e.g Google Chrome)
- Go to Localhost:8000 

Remember to close connection again when you are done: CTRL + C

---------------------------

#### To switch between NI Mate (mac) or Kinectron (windows) skeleton:

Change the variable "ni_mate" which you find in the file sketch.js
- change to false if using Kinectron
- change to true if using NI Mate

All code will work for both frameworks (but one at a time). 
Enjoy making more visuals!

Try modifying the function distanceCoolness(_start, _end) {}

---------------------------