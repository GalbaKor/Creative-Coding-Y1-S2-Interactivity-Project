var pipes = []; // array of objects
var popSound;
var particles = [];
var attractors = [];

// Sounds //

var scaleArray = [60, 62, 64, 67, 71, 72, 74, 76, 77]; //array of MIDI note numbers
var waveArray = ['sine','square','sawtooth','triangle']; //sound wave sources
var delay, reverb; // our effects.

function preload() {
    popSound = loadSound("sounds/Blop-Mark_DiAngelo-79054334.mp3");
  }

function setup() {
  var cnv = createCanvas(windowWidth/1.75, windowHeight/1.75);   // puts canvas function as a variable.
  cnv.style('display', 'block');                           // prevents scrollbars from appearing when size changes.
  cnv.parent('canvasholder')
  noFill();
}

function add() {                                            // add function - initiates a variable called plusone.
  var plusone = new Pipe(0,0);                                 // plusone adds a new Pipe class.
  pipes.push(plusone);                                      // pushes the new Pipe class into the pipes array.
}
function subtract() {                                       // subtract funtion - removes the latest addition to the array with pop
    pipes.pop();
    if(pipes.length > 0){
    popSound.play(); 
    }
  }
function reset() {
    for (let i = pipes.length; i >= 0; i --){
        if (pipes.length >= 0){
        pipes.pop();
        }
    }
    for (let i = attractors.length; i >= 0; i --){
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
    if (pipes[i].contains(mouseX, mouseY)) {
      pipes.splice(i, 1);
      popSound.play();
      var plusatt = new Attractor(mouseX, mouseY);
      attractors.push(plusatt);

      pred = random(155,255);
      pgreen = random(155,255);
      pblue = random(155,255);
      var pluspart = new Particle(mouseX, mouseY);
      fill(pred, pgreen, pblue);
      particles.push(pluspart);
      particles.push(pluspart);
      particles.push(pluspart);
           
    }
  }
}

function windowResized() {                                  // when window is resized, the canvas is resized with it.
  resizeCanvas(windowWidth/1.75, windowHeight/1.75);
}

function draw() {
  background(0);
  // move and display all the objects
  for (var i = 0; i < pipes.length; i++) {                  // if i is less than the array length, add one.
    //pipes[i].move();
    pipes[i].update();                                      // calls the update, checkEdges and display functions for everything in the pipes array.
    pipes[i].checkEdges();
    pipes[i].display();
  }
  for (let j = 0; j < attractors.length; j++) {
    attractors[j].update();
    attractors[j].display();
    attractors[j].checkEdges();
    for (let p = 0; p < pipes.length; p++){
        var force = attractors[j].calculateAttraction(pipes[p]);
        pipes[p].update();                                      // calls the update, checkEdges and display functions for everything in the pipes array.
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
    constructor(startX, startY){
		this.pos = createVector(startX, startY);
		this.r = 10;
        this.vel = createVector(random(0.5,1),random(0.5,1)); /* to get x or y, do this.vel.x or this.vel.y */
		/*this.xVel = random(0.5,2.5);
		this.yVel = random(0.5,2.5);*/
        this.acc = createVector(0,0);
        this.mass = 2;
    }
  
    contains(px, py) {
        let d = dist(px, py, this.pos.x, this.pos.y);
        if (attractors.length <1 && d < this.r) {
            return true;
        } else if (attractors.length >=1 && d < this.r+10){
            return true;
        } else if (attractors.length >=5 && d < this.r+20){
            return true;
        } else if (attractors.length >=10 && d < this.r+40){
            return true;
        }
        else {
        return false;
        }
    }

    applyForce(force){
        let f = p5.Vector.div(force, this.mass);	
        this.acc.add(force);
    }

	update() {
		this.pos = this.pos.add(this.vel); /* vector addition: new location = location.add(velocity); */
		this.vel.add(this.acc);
		this.pos.add(this.vel);
        this.acc.set(0, 0);
        
        
	}

	display() {
    var valr = document.getElementById("r").value;
    var valg = document.getElementById("g").value;
    var valb = document.getElementById("b").value;
    stroke(valr, valg, valb);
    strokeWeight(2.5)
		noFill();
        ellipse(this.pos.x, this.pos.y,this.r*2,this.r*2);
    stroke(valr/(random(1,5)), valg/(random(1,5)), valb/(random(1,5)));
        ellipse(this.pos.x-random(0,4), this.pos.y+random(0,4),(this.r-4)/2,(this.r-4)/2);
        ellipse(this.pos.x+random(0,4), this.pos.y+random(0,4),(this.r-4)/2,(this.r-4)/2);
        ellipse(this.pos.x-random(0,4), this.pos.y-random(0,4),(this.r-4)/2,(this.r-4)/2);
	}

	checkEdges() {
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

class Attractor {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(0.1,0.5), random(0.1,0.5));
        this.mass = 10;
        this.G = 1;
        this.r = 1;
    }

    calculateAttraction(p) {
        // Calculate direction of force
        let force = p5.Vector.sub(this.pos, p.pos);
        // Distance between objects
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

    checkEdges() {
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
	
	constructor(startX, startY, startMass){
		this.mass = startMass;
		this.r = 1;
		this.pos = createVector(startX, startY);
		this.vel = createVector(random(0.01,0.1), random(0.01,0.1));
        this.acc = createVector(0, 0);
        /// new stuff
		this.osc =  new p5.Oscillator(waveArray[Math.round(random(0, waveArray.length))]); //make a new oscillator with a random waveform type
		this.envelope = new p5.Env(); // make a new envelope
		this.envelope.setADSR(0.001, 0.5, 0.05, 0.9); // set attackTime, decayTime, sustainLevel, releaseTime
		this.note = Math.round(random(0, scaleArray.length)); //select a random MIDI note from our scaleArray
		this.envelope.setRange(0.01, 0); //set volume range on the envelope
		this.osc.amp(this.envelope); //map amplitude of envelope to the oscillator
		this.freqValue = midiToFreq(scaleArray[this.note]); // convert our MIDI note to a frequency value for the oscillator
		this.osc.freq(this.freqValue); //set the oscillator frequency
		this.osc.start();
		
	}

	applyForce(force) {
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

	checkEdges() {

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