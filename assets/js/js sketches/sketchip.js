var pipes = []; // array of objects
var popSound; // initialises pop sound variable
var particles = [];  //array of objects
var attractors = [];  // array of objects
// Sounds //

// var scaleArray = [60, 62, 64, 67, 71, 72, 74, 76, 77]; //array of MIDI note numbers: C 60, D 62, E 64, G 67, 71 B, 72 C, 74 D, 76 E, 77 F
var scaleArray = [62, 64, 66, 67, 69, 71, 73, 74]; // D major scale: D 62, E 64, F# 66, G 67, A 69, B 71, C# 73, D 74
var waveArray = ['sine','square','sawtooth','triangle']; //sound wave sources
var reverb; // reverb effect

function preload() { // uses preload function from p5.sound
    popSound = loadSound("sounds/Blop-Mark_DiAngelo-79054334.mp3"); // preloads a sound and stores it in the popSound variable
  }

function setup() {
  var cnv = createCanvas(windowWidth/1.75, windowHeight/1.75);   // puts canvas function as a variable.
  cnv.style('display', 'block');                           // prevents scrollbars from appearing when size changes.
  cnv.parent('canvasholder');                               // designates 'canvasholder' as the parent for the canvas. Canvasholder is an id in the html file
  noFill();                                                // no fill for objects created
}

function add() {                                            // add function - initiates a variable called plusone.
  var plusone = new Pipe(0,0);                                 // plusone adds a new Pipe class.
  pipes.push(plusone);                                      // pushes the new Pipe class into the pipes array.
}
function subtract() {                                       // subtract funtion - removes the latest addition to the array with pop
    pipes.pop();
    if(pipes.length >= 1){                                   // if the number of objects is above 0, play the pop sound. This prevents the pop sound from occuring if nothing is there to remove
      popSound.play(); 
      var plusatt = new Attractor(random(width), random(height));
      attractors.push(plusatt); 
      pred = random(155,255);                               // randomised rgb between 155 and 255. I chose 155 - 255 so that they would always be easily visible
      pgreen = random(155,255);
      pblue = random(155,255);
      var pluspart = new Particle(random(width), random(height));
      fill(pred, pgreen, pblue);
      particles.push(pluspart);
      particles.push(pluspart);
      particles.push(pluspart);
    }

    
  }
function reset() {                                          // a reset function that checks if there are more than 1 of any of my created objects, then removes one.
    for (let i = pipes.length; i >= 0; i --){               // This continues until there are 0 objects left.
        if (pipes.length >= 0){
        pipes.pop();
        }
    }
    for (let i = attractors.length; i >= 0; i --){          // eg, if there are more than 1 attractors, pop one attractor from the array then check again.
        if (attractors.length >= 0){
        attractors.pop();
        }
    }
    for (let i = particles.length; i >= 0; i --){
        if (particles.length >= 0){
        particles.pop();
        }
    }
}

function mousePressed() {                                   // if mouse is pressed and if one of the objects contains the mouse when it is pressed-
  for (let i = pipes.length - 1; i >= 0; i--) {             // -remove that specific object from the array
    if (pipes[i].contains(mouseX, mouseY)) {                // if pipe object contains mouse x and mouse y when the mouse is pressed - contain is a function created in the Pipes class
      pipes.splice(i, 1);                                   // splice - remove, that specific object from the array.
      popSound.play();                                      // then play the popSound
      for (let a = attractors.length; a < 2; a++) {
        var plusatt = new Attractor(mouseX, mouseY);        // Next, sets the plusatt variable to = a new Attractor object
        attractors.push(plusatt);                           // push this new Attractor object into the attractors array
      }                            

      pred = random(155,255);                               // randomised rgb between 155 and 255. I chose 155 - 255 so that they would always be easily visible
      pgreen = random(155,255);
      pblue = random(155,255);
      var pluspart = new Particle(mouseX, mouseY);          // same as plusatt but for particles rather than attractors and 3 particles are created, rather than 1.
      fill(pred, pgreen, pblue);
      particles.push(pluspart);
      
           
    }
  }
}

function windowResized() {                                  // when window is resized, the canvas is resized with it.
  resizeCanvas(windowWidth/1.75, windowHeight/1.75);        // canvas size is the same as the width and height / 1.75  -  keeps the canvas smaller than the window.
}

function draw() {
  background(0);
  // move and display all the objects
  for (var i = 0; i < pipes.length; i++) {                  // if i is less than the array length, add one.
    //pipes[i].move();
    pipes[i].update();                                      // calls the update, checkEdges and display functions for everything in the pipes array.
    pipes[i].checkEdges();                                  // the pipes update, checkEdges and display are listed twice here so that they are updated for each state the piece is in.
    pipes[i].display();                                     // if there no attractors, this is my state 1. If there are attractors, the pipes use the force of the attractors to speed up - state 2.
  }
  for (let j = 0; j < attractors.length; j++) {             // ditto above, calls update, display and checkedges for attractors. 
    attractors[j].update();
    attractors[j].display();
    attractors[j].checkEdges();
    for (let p = 0; p < pipes.length; p++){
        var force = attractors[j].calculateAttraction(pipes[p]);
        pipes[p].applyForce(force);
        pipes[p].update();                                      // calls the update, checkEdges, applyForce and display functions for everything in the pipes array.
        pipes[p].checkEdges();
        pipes[p].display();
    }
    for (let i = 0; i < particles.length; i++) {
      var force = attractors[j].calculateAttraction(particles[i]);
      particles[i].applyForce(force);
      particles[i].update();
      particles[i].display();
      particles[i].checkEdges();
    }
  }
  
}

// Pipe class
class Pipe {
    constructor(startX, startY){   // create at an x and y position.
		this.pos = createVector(startX, startY);    // vector starts at x and y
		this.r = 10;   // radius of 10
        this.vel = createVector(random(0.5,1),random(0.5,1)); /* to get x or y, do this.vel.x or this.vel.y */
        this.acc = createVector(0,0);   
        this.mass = 2;  // mass of 2
    }
  
    contains(px, py) {        // my contains function to check if the circle contains mouse
        let d = dist(px, py, this.pos.x, this.pos.y);   // d is a distance between the chosen x and y coordinates, and the x and y coordinates of the parent class - the pipe/ circle.
        if (attractors.length <1 && d < this.r) {       // I added three different if statements since adding more attractors increases the speed of the pipe circles. 
            return true;                                // thus I needed some leeway - the r+x - so that you can still click on the circles when they are going at speed.
        } else if (attractors.length >=1 && d < this.r+10){       // if attractor length is less than 1, mouse needs to be perfectly in the bubble.
            return true;    
        } else if (attractors.length >=5 && d < this.r+20){       // if attractor length is above 1, 5 and 10 mouse can be outside of the radius + an additional amount.
            return true;
        } else if (attractors.length >=10 && d < this.r+40){       // if the px, py is between the center of the pipe/ circle and the edge of the circle - defined by the radius, return true.
            return true;                    
        }
        else {                                                     // else if the mouse is not inside the circle, return false.
        return false;
        }
    }

    applyForce(force){
        let f = p5.Vector.div(force, this.mass);	  // apply a force to the object using a force variable and the mass of the class.
        this.acc.add(force);                        // add force to the acceleration. Using this, adding attractors affects the movement of the objects inside the pipe array.
    }

	update() {
		this.pos = this.pos.add(this.vel);  // new location is  the old location + change that velocity has applied to it
		this.vel.add(this.acc);             // add acceleration to velocity
		this.pos.add(this.vel);             // add velocity to position
    this.acc.set(0, 0);
        
        
	}

	display() {                                         // displayed elements use rgb from sliders in html, with IDs 'r', 'g' and 'b'.
    var valr = document.getElementById("r").value;
    var valg = document.getElementById("g").value;
    var valb = document.getElementById("b").value;
    stroke(valr, valg, valb);
    strokeWeight(2.5)                                 // thicker strokeWeight to make them more visible.
		noFill();
        ellipse(this.pos.x, this.pos.y,this.r*2,this.r*2);              // creates ellipses at start position with a larger radius, then makes a series of smaller ellipses inside.
    stroke(valr/(random(1,5)), valg/(random(1,5)), valb/(random(1,5)));
        ellipse(this.pos.x-random(0,4), this.pos.y+random(0,4),(this.r-4)/2,(this.r-4)/2); // the use of random for this.pos.x and y means that they will constantly shift position
        ellipse(this.pos.x+random(0,4), this.pos.y+random(0,4),(this.r-4)/2,(this.r-4)/2); // as the display and update functions are called under the draw function
        ellipse(this.pos.x-random(0,4), this.pos.y-random(0,4),(this.r-4)/2,(this.r-4)/2); // meanwhile by using the pos.x and pos.y of the parent, they remain inside the larger ellipse.
	}

	checkEdges() {                              // a function to check edges and bounce objects back off the edges. The edges are defined by width and height.
		if (this.pos.x > (width-this.r)) {        // if the x and y positions are greater than the width and height of the canvas minus the radius, the veolocity is reversed so it bounces back.
		  this.vel.x *= -1;                       // the radius is important here as it helps create the illusion that the circle bounces when the stroke hits the edge, rather than the area inside the circle.
		  this.pos.x = width-this.r;    
		} else if (this.pos.x < (0+this.r)) {      // reverse x position for left and right, then same for y positions below.
		  this.vel.x *= -1;
		  this.pos.x = 0+this.r;
		}

		if (this.pos.y > (height-this.r)) {
		  this.vel.y *= -1;
		  this.pos.y = height-this.r;
		} else if (this.pos.y < (0+this.r)) {
		  this.vel.y *= -1;
		  this.pos.y = 0+this.r;
		}
    }
    
}

class Attractor {                            // attractor class. Creates an object at x and y position with a vector movement using a random velocity.

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(0.1,0.5), random(0.1,0.5));
        this.mass = 10;                      // higher mass than other objects so that other objects move round the attractor.
        this.G = 1;                          // gravitational strength of 1 and radius of 1.
        this.r = 1;   
    }

    calculateAttraction(p) {                  // calculates attraction of other elements to the attractor. Uses code from class.
        // calculates the direction of force
        let force = p5.Vector.sub(this.pos, p.pos);
        // distance between objects
        let distance = force.mag();
        // Artificial constraint
        distance = constrain(distance, 5, 25);
        // Normalize vector (distance doesn't matter here, we just want this vector for direction)
        force.normalize();
        // Calculate gravitional force magnitude
        let strength = (this.G * this.mass * p.mass) / (distance * distance);
        // Get force vector -> magnitude * direction
        force.mult(strength); 
        return force;
    }

    update() {
        this.pos.add(this.vel);
    }

    display() {
        // ellipseMode(CENTER);
        strokeWeight(3);
        stroke(0);
        point(this.pos.x, this.pos.y);
    }

    checkEdges() {      // same as checkEdges used in pipe class
        if (this.pos.x > (width-this.r)) {
        this.vel.x *= -1;
        this.pos.x = width-this.r;
        } else if (this.pos.x < (0+this.r)) {
        this.vel.x *= -1;
        this.pos.x = 0+this.r;
        }

        if (this.pos.y > (height-this.r)) {
        this.vel.y *= -1;
        this.pos.y = height-this.r;
        } else if (this.pos.y < (0+this.r)) {
        this.vel.y *= -1;
        this.pos.y = 0+this.r;
        }
    }
}

class Particle {
	
	constructor(startX, startY){
    // vector position and forces
		this.mass = 1;
		this.r = 1;
		this.pos = createVector(startX, startY); // allows user to choose start position
		this.vel = createVector(random(0.01,0.1), random(0.01,0.1));  // creates a vector with a random speed
    this.acc = createVector(0, 0); // vector acceleration
        // Sound code
		this.osc =  new p5.Oscillator(waveArray[Math.round(random(0, waveArray.length))]); //make a new oscillator with a random waveform type
		this.envelope = new p5.Envelope(); // make a new envelope
		this.envelope.setADSR(0.001, 0.5, 0.05, 0.1); // sets the attackTime, decayTime, sustainLevel, releaseTime
		this.note = Math.round(random(0, scaleArray.length)); // selects a random MIDI note from the scaleArray array
		this.envelope.setRange(0.01, 0); // sets the volume range for the envelope
		this.osc.amp(this.envelope); // allows the oscillator to use the amplitude in this.envelope
		this.freqValue = midiToFreq(scaleArray[this.note]); // convert our MIDI note to a frequency value for the oscillator
		this.osc.freq(this.freqValue); //set the oscillator frequency
		this.osc.start();
		
	}

	applyForce(force) {         // same as other classes
		var f = p5.Vector.div(force, this.mass);
		this.acc.add(force);
	} 

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.set(0, 0);
	}

	display() {
		stroke(pred, pgreen, pblue);
		strokeWeight(2);
		fill(255);
    ellipse(this.pos.x, this.pos.y,this.r,this.r);
	}

	checkEdges() {      // same as pipe class

		if (this.pos.x > (width-this.r)) {
		  this.vel.x *= -1;
          this.pos.x = width-this.r;
		  this.envelope.play(this.osc, 0, 0.1);  // play sound
		} else if (this.pos.x < (0+this.r)) {
		  this.vel.x *= -1;
          this.pos.x = 0+this.r;
		  this.envelope.play(this.osc, 0, 0.1); // play sound
		}

		if (this.pos.y > (height-this.r)) {
		  this.vel.y *= -1;
          this.pos.y = height-this.r;
		  this.envelope.play(this.osc, 0, 0.1); // play sound
		} else if (this.pos.y < (0+this.r)) {
		  this.vel.y *= -1;
          this.pos.y = 0+this.r;
		  this.envelope.play(this.osc, 0, 0.1); // play sound
		}

	}

}