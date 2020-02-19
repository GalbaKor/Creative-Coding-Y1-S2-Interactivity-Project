var pipes = []; // array of Jitter objects

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

}

// create new object when mouse is pressed
function mousePressed() {

  var b = new Pipe();
  pipes.push(b);
}

function draw() {
  background(0);
  // move and display all the objects
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].move();
    pipes[i].display();
  }
}

// Pipe class
class Pipe {

  constructor() {
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
  }
}