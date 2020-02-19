var pipes = []; // array of objects
/*var slider1, slider2, slider3;*/


function setup() {
  var cnv = createCanvas(windowWidth/1.75, windowHeight/1.75);   // puts canvas function as a variable.
  cnv.style('display', 'block');                           // prevents scrollbars from appearing when size changes.
  cnv.parent('canvasholder')
  noFill();

/*
  // rgb sliders //
  slider1 = createSlider(0, 255, 0);
  slider1.position(windowWidth*.15, windowHeight/2-100);
  slider1.style('width', '80px');
  
  slider2 = createSlider(0, 255, 0);
  slider2.position(windowWidth*.15, windowHeight/2);
  slider2.style('width', '80px');
  
  slider3 = createSlider(0, 255, 0);
  slider3.position(windowWidth*.15, windowHeight/2+100);
  slider3.style('width', '80px');
*/
}

function add() {                                            // add function - initiates a variable called plusone.
  var plusone = new Pipe(0,0);                                 // plusone adds a new Pipe class.
  pipes.push(plusone);                                      // pushes the new Pipe class into the pipes array.
}
function subtract() {                                       // subtract funtion - removes the latest addition to the array with pop
  pipes.pop();
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

  /*constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = 20;
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.stroke = stroke(this.red,this.green,this.blue);
    this.speed = random(0,2);
    this.xDir = random(-2,2);
    this.yDir = random(-2,2);
  	let timer = 2;
  }

  move() {    
    this.timer = round(millis());
    
    if (this.timer%88 == 0){
      this.xDir = random(-2, 2);
      this.yDir = random(-2, 2);
    }     
    this.x += (this.speed * this.xDir);
    this.y += (this.speed * this.yDir); 
    
    if(this.x <= -this.diam || this.x >= width+this.diam || this.y <= -this.diam || this.y >= height+this.diam){   // if it goes off the screen, it reappears at a new position.
      this.x = random(width);
      this.y = random(height);
      this.red = random(255);
      this.green = random(255);
      this.blue = random(255); 
     }
  }

  display() {
    ellipse(this.x, this.y, this.diameter);
    ellipse(this.x, this.y, this.diameter/2);
  }*/

  constructor(startX, startY){
		this.pos = createVector(startX, startY)
		/*this.x = startX;
		this.y = startY;*/
		this.r = 10;

		this.vel = createVector(random(0.5,2.5),random(0.5,2.5)); /* to get x or y, do this.vel.x or this.vel.y */
		/*this.xVel = random(0.5,2.5);
		this.yVel = random(0.5,2.5);*/

		this.acc = createVector(0,0);

    this.mass = 2;
    
    /*this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.stroke = stroke(this.red,this.green,this.blue);*/
    
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
		/*var r = slider1.value();
    var g = slider2.value();
    var b = slider3.value();*/
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

  /*
  # Nature_of_Code_p5js
  
  Study files of - Daniel Shiffman's Nature of Code course on:
  https://www.kadenze.com/courses/the-nature-of-code/info
  
  
  More info:
  https://github.com/shiffman/The-Nature-of-Code
  http://natureofcode.com/
  
  Gravitational Attraction
  */


