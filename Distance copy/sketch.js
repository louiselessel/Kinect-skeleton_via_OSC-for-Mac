/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.

Modified by Louise Lessél, NYU-ITP
To choose to use NI_mate or Kinectron

To switch between NI_mate or Kinectron, 
change the variable ni_mate to false if using Kinectron / to true if using NI_mate.

---------------------------
The code works!
I have been using the "live preview" lightning icon (upper right corner of interface) in my Brackets to run the code though
I am not sure what port it is supposed to be output on?

To run:
In terminal:
cd to path of folder containing all sketches
node bridge.js

Go to in chrome:
http://localhost:????      (I am not sure what port!)



---------------------------
Issue for Mimi: 
I am not sure how to adapt code so both could call the same function for the visuals. Regardless of whether I am using NI_mate or Kinectron.

The issue is, that I was unable to figure out adapting the scaling of the joints.
Somehow the ni_mate values would not be treated the same (as the function scaleJoint(joint)), so I had to put them in an array.

Since the ni_mate joints are now arrays, and the kinectron is something else, you cannot just do this, which would be totally awesome:

// ni_mate calling function with the _ni variables
distanceCoolness(handRight_ni, handLeft_ni);
// or
// kinectron calling same function - but with the kinectron variables
distanceCoolness(handRight, handLeft);

-----------------------------

Here are the two different implementations of the scaling function:

// kinectron implementation
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
}

// ni_mate implementation
function scaleJoint_ni_mate(_x,_y,_z) {
    let pos = [0,0,0];
    pos[0] = (_x * -width / 2) + width / 2;
    pos[1] = (_y * -height / 2) + height;
    pos[2] = (_z * 100)
    return pos;  
}

-------------------------------

To illustrate, here are the two different distanceCoolness(_start, _end) functions

// Kinectron implementation
function distanceCoolness(_start, _end) {
  // Pick 2 joints to connect
  let start = _start;
  let end = _end;

  // Draw a line
  stroke(255);
  line(start.x, start.y, end.x, end.y);
  let d = dist(start.x, start.y, end.x, end.y);

  // Map the distance to angle speed
  let aspeed = map(d, 0, width, 0, PI/2);
  // Inverse, non-linear mapping
  //let aspeed = 1/d;

  a+=aspeed;

  noStroke();
	// Calculate circular pathway
  let x = cos(a)*width/4 + width/2;
  let y = sin(a)*width/4 + height/2;
  ellipse(x, y, 5, 5);
}


// ni_mate implementation
function distanceCoolness(_start, _end) {
  // check that joints are not empty
  if (_start != null && _end != null) {
      // Pick 2 joints to connect
      let start = _start;
      let end = _end;

      // Draw a line
      stroke(255);
      line(start[0], start[1], end[0], end[1]);
      
      let d = dist(start[0], start[1], end[0], end[1]);

      // Map the distance to angle speed
      let aspeed = map(d, 0, width*50, 0, PI/2);
      // Inverse, non-linear mapping
      //let aspeed = 1/d;

      a+=aspeed;

      noStroke();
      // Calculate circular pathway
      let x = cos(a)*width/4 + width/2;
      let y = sin(a)*width/4 + height/2;
      fill(255);
      ellipse(x, y, 5, 5);
  }
}
*/


// Variable for circle
let a = 0;


// Declare kinectron
let kinectron = null;

// Kinectron or NI_mate?    <--- Change to false if using Kinectron / to true if using NI_mate
let ni_mate = true;

// Kinectron ONLY variables  -------------
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


// NI_mate ONLY variables --------------
// Mid-line
let head_ni = null;
let neck_ni = null;
let chest_ni = null;
let torso_ni = null;
let pelvis_ni = null;

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





function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  background(0);
}

function init(){
  // if Using Kinectron
  if (ni_mate == false) {
      // Define and create an instance of kinectron
      kinectron = new Kinectron("10.18.68.35");  //  <---- Set IP here

      // Connect with application over peer
      kinectron.makeConnection();

      // Request all tracked bodies and pass data to your callback
      kinectron.startTrackedBodies(bodyTracked);
 }
    
  // if Using ni_mate
  if (ni_mate == true) {
      setupOsc(7000, 3334);     // <---- Set ports here (oscPortIn, oscPortOut)
  }
}



function draw() {
  background(0);
  if (ni_mate) {
    fill(255);
    // draw entire skeleton
    drawAllJoints_ni_mate();
    // call your awesome function that draws visuals
    distanceCoolness(handRight_ni, handLeft_ni);
  }
    
  if (ni_mate == false) {
    // call your awesome function that draws visuals
    distanceCoolness(handRight, handLeft);
  }
}




// ------------ STUFF FOR USING NI_MATE via OSC ------------------

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

function receiveOsc(address, value) {
    // only care about OSC if using ni_mate, so if ni_mate == true
    if (ni_mate) {
        //console.log("received OSC: " + address + ", " + value);
        
        // Set values of everything
        // Mid-line
        if (address == 'Head') {
            head_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Neck') {
            neck_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Chest') {
            chest_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Torso') {
            torso_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Pelvis') {
            pelvis_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }

        
        // Left Arm
        if (address == 'Left_Collar') {
            collarLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Shoulder') {
            shoulderLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Elbow') {
            wristLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Wrist') {
            elbowLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Hand') {
            handLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Hand_Tip') {
            handTipLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Thumb') {
            thumbLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        
        // Right Arm
        if (address == 'Right_Collar') {
            collarRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Shoulder') {
            shoulderRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Elbow') {
            elbowRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Wrist') {
            wristRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Hand') {
            handRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Hand_Tip') {
            handTipRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Thumb') {
            thumbRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        

        // Left Leg
        if (address == 'Left_Hip') {
            hipLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Knee') {
            kneeLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Ankle') {
            ankleLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Left_Foot') {
            footLeft_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        
        // Right Leg
        if (address == 'Right_Hip') {
            hipRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Knee') {
            kneeRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Ankle') {
            ankleRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        if (address == 'Right_Foot') {
            footRight_ni = scaleJoint_ni_mate(value[0],value[1],value[2]);
        }
        
    }
}

// Scale the joint position data to fit the screen
function scaleJoint_ni_mate(_x,_y,_z) {
    let pos = [0,0,0];
    pos[0] = (_x * -width / 2) + width / 2;
    pos[1] = (_y * -height / 2) + height;
    pos[2] = (_z * 100)
    return pos;  
}

// Draw skeleton / all joints
function drawAllJoints_ni_mate() {
  // Mid-line
    drawJoint_ni_mate(head_ni);
    drawJoint_ni_mate(neck_ni);
    drawJoint_ni_mate(chest_ni);
    drawJoint_ni_mate(torso_ni);
    drawJoint_ni_mate(pelvis_ni);
    
    // Left Arm
    drawJoint_ni_mate(collarLeft_ni);
    drawJoint_ni_mate(shoulderLeft_ni);
    drawJoint_ni_mate(elbowLeft_ni);
    drawJoint_ni_mate(wristLeft_ni);
    drawJoint_ni_mate(handLeft_ni);
    drawJoint_ni_mate(handTipLeft_ni);
    drawJoint_ni_mate(thumbLeft_ni);
    
    // Right Arm
    drawJoint_ni_mate(collarRight_ni);
    drawJoint_ni_mate(shoulderRight_ni);
    drawJoint_ni_mate(elbowRight_ni);
    drawJoint_ni_mate(wristRight_ni);
    drawJoint_ni_mate(handRight_ni);
    drawJoint_ni_mate(handTipRight_ni);
    drawJoint_ni_mate(thumbRight_ni);
    
    // Left Leg
    drawJoint_ni_mate(hipLeft_ni);
    drawJoint_ni_mate(kneeLeft_ni);
    drawJoint_ni_mate(ankleLeft_ni);
    drawJoint_ni_mate(footLeft_ni);
    
    // Right Leg
    drawJoint_ni_mate(hipRight_ni);
    drawJoint_ni_mate(kneeRight_ni);
    drawJoint_ni_mate(ankleRight_ni);
    drawJoint_ni_mate(footRight_ni);
}

// Draw joint
function drawJoint_ni_mate(_joint) {
  //console.log(_joint);

 if (_joint != null) {
  stroke(255);
  strokeWeight(5);
  point(_joint[0], _joint[1]);
  //fill(255);
  //ellipse(_joint[0], _joint[1], 100, 100);
 }
}

function distanceCoolness(_start, _end) {
  // check that joints are not empty
  if (_start != null && _end != null) {
      // Pick 2 joints to connect
      let start = _start;
      let end = _end;

      // Draw a line
      stroke(255);
      line(start[0], start[1], end[0], end[1]);
      
      let d = dist(start[0], start[1], end[0], end[1]);

      // Map the distance to angle speed
      let aspeed = map(d, 0, width*50, 0, PI/2);
      // Inverse, non-linear mapping
      //let aspeed = 1/d;

      a+=aspeed;

      noStroke();
      // Calculate circular pathway
      let x = cos(a)*width/4 + width/2;
      let y = sin(a)*width/4 + height/2;
      fill(255);
      ellipse(x, y, 5, 5);
  }
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}




// ------------ STUFF FOR USING KINECTRON // FROM MIMI'S CODE ------------------

// use input from Kinectron
function bodyTracked(body) {
  // Draw all the joints
  //kinectron.getJoints(drawJoint);

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

  // call function to do stuff here?
  // distanceCoolness(handRight, handLeft);
}



// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  let pos = scaleJoint(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}

/* 
// Version for Kinectron      < -------- not sure how to adapt so both could call same function
function distanceCoolness(_start, _end) {
  // Pick 2 joints to connect
  let start = _start;
  let end = _end;

  // Draw a line
  stroke(255);
  line(start.x, start.y, end.x, end.y);
  let d = dist(start.x, start.y, end.x, end.y);

  // Map the distance to angle speed
  let aspeed = map(d, 0, width, 0, PI/2);
  // Inverse, non-linear mapping
  //let aspeed = 1/d;

  a+=aspeed;

  noStroke();
	// Calculate circular pathway
  let x = cos(a)*width/4 + width/2;
  let y = sin(a)*width/4 + height/2;
  ellipse(x, y, 5, 5);
}
*/
