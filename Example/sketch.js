/*
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

Drag the index.html file into browser window (e.g Google Chrome)
*/


// ------------- Global variables  -------------

// Variable for circle
let a = 0;

// Declare kinectron
let kinectron = null;

// Using Kinectron or NI_mate?    <--- Change to false if using Kinectron / to true if using NI_mate
let ni_mate = false;


// ------------- Kinectron ONLY variables  -------------
// Mid-line
let head = null;
let neck = null;
let spineShoulder = null;
let spineMid = null;
let spineBase = null;

// Right Arm
let shoulderRight = null;
let elbowRight = null;
let wristRight = null;
let handRight = null;
let handTipRight = null;
let thumbRight = null;

// Left Arm
let shoulderLeft = null;
let elbowLeft = null;
let wristLeft = null;
let handLeft = null;
let handTipLeft = null;
let thumbLeft = null;

// Right Leg
let hipRight = null;
let kneeRight = null;
let ankleRight = null;
let footRight = null;

// Left Leg
let hipLeft = null;
let kneeLeft = null;
let ankleLeft = null;
let footLeft = null;


// ------------- NI_mate ONLY variables --------------
// Mid-line
let head_ni = null;
let neck_ni = null;
let chest_ni = null;  //this never gets sent from ni_mate when in basic mode - don't use
let torso_ni = null;
let pelvis_ni = null; //this never gets sent from ni_mate when in basic mode - don't use 

// Right Arm
let collarRight_ni = null;
let shoulderRight_ni = null;
let elbowRight_ni = null;
let wristRight_ni = null;
let handRight_ni = null;
let handTipRight_ni = null;
let thumbRight_ni = null;

// Left Arm
let collarLeft_ni = null;
let shoulderLeft_ni = null;
let elbowLeft_ni = null;
let wristLeft_ni = null;
let handLeft_ni = null;
let handTipLeft_ni = null;
let thumbLeft_ni = null;

// Right Leg
let hipRight_ni = null;
let kneeRight_ni = null;
let ankleRight_ni = null;
let footRight_ni = null;

// Left Leg
let hipLeft_ni = null;
let kneeLeft_ni = null;
let ankleLeft_ni = null;
let footLeft_ni = null;


// ------------ SETUP ------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  //console.log(windowWidth);
  background(0);
}

// initialize variables and servers from either Kinect
function init(){
    // if Using Kinectron
    if (ni_mate == false) {
        // Define and create an instance of kinectron
        kinectron = new Kinectron("10.17.201.104");         //  <---- Set IP here
        // Connect with application over peer
        kinectron.makeConnection();
        // Request all tracked bodies and pass data to your callback
        kinectron.startTrackedBodies(bodyTracked);
     }
    // if Using ni_mate
    if (ni_mate == true) {
        setupOsc(7000, 3334);                             // <---- Set ports here (oscPortIn, oscPortOut)
    }
}


// ------------ DRAW ------------------

function draw() {
  background(0);
    
  // draw entire skeleton
  drawAllJoints();
    
  // using Ni Mate (use the "handRight_ni" variables)
  if (ni_mate) {
    fill(255);
    // call your awesome function that draws visuals
    distanceCoolness(handRight_ni, handLeft_ni);
  }

  // using Kinectron (use the "handRight" variables)
  else {
    // call your awesome function that draws visuals
    distanceCoolness(handRight, handLeft);
  }
}




// ------------ Do awesome visuals ------------------

// Pick 2 joints to connect
function distanceCoolness(_start, _end) { 
    // check joint is not empty!
    if (_start != null && _end != null) {
      let start = _start;
      let end = _end;

      // Draw a line
      stroke(255);
      line(start.x, start.y, end.x, end.y);
        
      let d = dist(start.x, start.y, end.x, end.y);

      // Map the distance to angle speed
      let aspeed = map(d, 0, width*50, 0, PI/2);
      // Inverse, non-linear mapping
      //let aspeed = 1/d;

      a+=aspeed;

      noStroke();
      // Calculate circular pathway
      let x = cos(a)*width/4 + width/2;
      let y = sin(a)*width/4 + height/2;
      ellipse(x, y, 5, 5);
    }
}


// ------------ Do stuff to the skeleton ------------------


// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
    // scaling for using ni_mate
    if (joint != null) {
        if (ni_mate == true){
            return {
                x: (joint.cameraX * width / 2) + width / 2,
                y: (-joint.cameraY * height / 2) + height / 2,
                z: joint.cameraZ * 100
            }
        }

        // scaling for using kinectron
        else {
            fill(255);
            ellipse(100,100,50,50);
            return {
                x: (joint.cameraX * width / 2) + width / 2,
                y: (-joint.cameraY * width / 2) + height / 2,
                //z: joint.cameraZ
            }
        }
    }
}

// Draw a joint
function drawJoint(joint) {
    // check joint is not empty
    if (joint != null) {
      stroke(255);
      strokeWeight(5);
      point(joint.x, joint.y);
    }
}

// Draw skeleton / all joints
function drawAllJoints() {
    if (ni_mate) {
        // Mid-line
        drawJoint(head_ni);
        drawJoint(neck_ni);
        drawJoint(chest_ni);
        drawJoint(torso_ni);
        drawJoint(pelvis_ni);

        // Left Arm
        drawJoint(collarLeft_ni);
        drawJoint(shoulderLeft_ni);
        drawJoint(elbowLeft_ni);
        drawJoint(wristLeft_ni);
        drawJoint(handLeft_ni);
        drawJoint(handTipLeft_ni);
        drawJoint(thumbLeft_ni);

        // Right Arm
        drawJoint(collarRight_ni);
        drawJoint(shoulderRight_ni);
        drawJoint(elbowRight_ni);
        drawJoint(wristRight_ni);
        drawJoint(handRight_ni);
        drawJoint(handTipRight_ni);
        drawJoint(thumbRight_ni);

        // Left Leg
        drawJoint(hipLeft_ni);
        drawJoint(kneeLeft_ni);
        drawJoint(ankleLeft_ni);
        drawJoint(footLeft_ni);

        // Right Leg
        drawJoint(hipRight_ni);
        drawJoint(kneeRight_ni);
        drawJoint(ankleRight_ni);
        drawJoint(footRight_ni);
    }
    
    else {
        // Mid-line
        drawJoint(head);
        drawJoint(neck);
        drawJoint(spineShoulder);
        drawJoint(spineMid);
        drawJoint(spineBase);

         // Left Arm
        drawJoint(shoulderLeft);
        drawJoint(elbowLeft);
        drawJoint(wristLeft);
        drawJoint(handLeft);
        drawJoint(handTipLeft);
        drawJoint(thumbLeft);

        // Right Arm
        drawJoint(shoulderRight);
        drawJoint(elbowRight);
        drawJoint(wristRight);
        drawJoint(handRight);
        drawJoint(handTipRight);
        drawJoint(thumbRight);

        // Left Leg
        drawJoint(hipLeft);
        drawJoint(kneeLeft);
        drawJoint(ankleLeft);
        drawJoint(footLeft);

        // Right Leg
        drawJoint(hipRight);
        drawJoint(kneeRight);
        drawJoint(ankleRight);
        drawJoint(footRight);
    }
}



// ------------ Getting Skeleton from KINECTRON ------------------

// use input from Kinectron
function bodyTracked(body) {
  // Draw all the joints
  // kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them
  // Mid-line
   head = scaleJoint(body.joints[kinectron.HEAD]);
   neck = scaleJoint(body.joints[kinectron.NECK]);
   spineShoulder = scaleJoint(body.joints[kinectron.SPINESHOULDER]);
   spineMid = scaleJoint(body.joints[kinectron.SPINEMID]);
   spineBase = scaleJoint(body.joints[kinectron.SPINEBASE]);

  // Right Arm
   shoulderRight = scaleJoint(body.joints[kinectron.SHOULDERRIGHT]);
   elbowRight = scaleJoint(body.joints[kinectron.ELBOWRIGHT]);
   wristRight = scaleJoint(body.joints[kinectron.WRISTRIGHT]);
   handRight = scaleJoint(body.joints[kinectron.HANDRIGHT]);
   handTipRight = scaleJoint(body.joints[kinectron.HANDTIPRIGHT]);
   thumbRight = scaleJoint(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
   shoulderLeft = scaleJoint(body.joints[kinectron.SHOULDERLEFT]);
   elbowLeft = scaleJoint(body.joints[kinectron.ELBOWLEFT]);
   wristLeft = scaleJoint(body.joints[kinectron.WRISTLEFT]);
   handLeft = scaleJoint(body.joints[kinectron.HANDLEFT]);
   handTipLeft = scaleJoint(body.joints[kinectron.HANDTIPLEFT]);
   thumbLeft = scaleJoint(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
   hipRight = scaleJoint(body.joints[kinectron.HIPRIGHT]);
   kneeRight = scaleJoint(body.joints[kinectron.KNEERIGHT]);
   ankleRight = scaleJoint(body.joints[kinectron.ANKLERIGHT]);
   footRight = scaleJoint(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
   hipLeft = scaleJoint(body.joints[kinectron.HIPLEFT]);
   kneeLeft = scaleJoint(body.joints[kinectron.KNEELEFT]);
   ankleLeft = scaleJoint(body.joints[kinectron.ANKLELEFT]);
   footLeft = scaleJoint(body.joints[kinectron.FOOTLEFT]);
    
   //console.Log("head" + head);
}




// ------------ Getting Skeleton from NI_MATE via OSC ------------------

// Setup OSC
function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}

// use input from NI_mate
function receiveOsc(address, value) {
    // only care about OSC if using ni_mate, so if ni_mate == true
    if (ni_mate) {
        //console.log("received OSC: " + address + ", " + value);
        
        // Set values of everything
        // Mid-line
        if (address == 'Head') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            head_ni = scaleJoint(joint);
        }
        if (address == 'Neck') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            neck_ni = scaleJoint(joint);
        }
        
        if (address == 'Chest') { // this never gets sent from ni_mate when in basic mode - don't use
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            chest_ni = scaleJoint(joint);
        }
    
        if (address == 'Torso') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            torso_ni = scaleJoint(joint);
            //console.log("received OSC: " + address + ", " + value);
        }
        
        if (address == 'Pelvis') { // this never gets sent from ni_mate when in basic mode - don't use
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            pelvis_ni = scaleJoint(joint);
            
        }

        // Left Arm
        if (address == 'Left_Collar') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            collarLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Shoulder') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            shoulderLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Elbow') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            elbowLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Wrist') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            wristLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Hand') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            handLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Hand_Tip') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            handTipLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Thumb') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            thumbLeft_ni = scaleJoint(joint);
        }
        
        
        // Right Arm
        if (address == 'Right_Collar') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            collarRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Shoulder') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            shoulderRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Elbow') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            elbowRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Wrist') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            wristRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Hand') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            handRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Hand_Tip') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            handTipRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Thumb') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            thumbRight_ni = scaleJoint(joint);
        }
        

        // Left Leg
        if (address == 'Left_Hip') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            hipLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Knee') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            kneeLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Ankle') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            ankleLeft_ni = scaleJoint(joint);
        }
        if (address == 'Left_Foot') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            footLeft_ni = scaleJoint(joint);
        }
        
        // Right Leg
        if (address == 'Right_Hip') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            hipRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Knee') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            kneeRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Ankle') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            ankleRight_ni = scaleJoint(joint);
        }
        if (address == 'Right_Foot') {
            let joint = {
              cameraX : value[0],
              cameraY : value[1],
              cameraZ : value[2]
            }
            footRight_ni = scaleJoint(joint);
        }
    }
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}
