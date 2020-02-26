var pipes = []; // array of objects
var popSound;

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
  popSound.play();
}
function mousePressed() {                                   // if mouse is pressed and if one of the objects contains the mouse when it is pressed-
  for (let i = pipes.length - 1; i >= 0; i--) {             // -remove that specific object from the array
    if (pipes[i].contains(mouseX, mouseY)) {
      pipes.splice(i, 1);
      popSound.play();

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
}

// Pipe class
class Pipe {
  constructor(startX, startY){
		this.pos = createVector(startX, startY)
		this.r = 10;
		this.vel = createVector(random(0.5,2.5),random(0.5,2.5)); /* to get x or y, do this.vel.x or this.vel.y */
		/*this.xVel = random(0.5,2.5);
		this.yVel = random(0.5,2.5);*/
		this.acc = createVector(0,0);
    this.mass = 2;
  }
  
  contains(px, py) {
    let d = dist(px, py, this.pos.x, this.pos.y);
    if (d < this.r) {
      return true;
    } else {
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
    stroke(255);
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