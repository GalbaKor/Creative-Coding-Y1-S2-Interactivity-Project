let Pipes = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	noFill();
	/*for(let i = 0; i < Pipenum; i++){
		Pipes[i] = new Pipe;
		Pipes[i].move();
		Pipes[i].display();
  }*/
  
  for( let i = 0; i < Pipes; i++) {
    Pipes.push(new Pipe());
  }
  
}

function draw() {
  for( let i = 0; i < Pipes; i++) {
    Pipes.push(new Pipe());
    /*Pipes[i].move();*/
    Pipes[i].display();
  }
}

function mousePressed() {
  Pipes.push();
}

class Pipe {
  constructor(){
    this.x = random(width);
    this.y = random(height);
    this.diam = 200;
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.stroke = stroke(this.red,this.green,this.blue);
    this.speed = random(1);
    this.xDir = random(-2,2);
    this.yDir = random(-2,2);
	let timer = 2;
  }



  /*move(){
    this.timer = round(millis());
    
    if (this.timer%88 == 0){
      this.xDir = random(-2, 2);
      this.yDir = random(-2, 2);
    }     
    this.x += (this.speed * this.xDir);
    this.y += (this.speed * this.yDir); 
    
    if(this.x <= -this.diam || this.x >= width+this.diam || this.y <= -this.diam || this.y >= height+this.diam){
      this.x = random(width);
      this.y = random(height);
      this.red = random(255);
      this.green = random(255);
      this.blue = random(255);
    }    
  }*/
  display(){
    this.stroke = stroke(this.red,this.green,this.blue);
    ellipse(this.x, this.y, this.diam, this.diam);
   }
}

/*
let Pipe = []; 
let nbrPipe = 1;
let pressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  noFill();
  strokeWeight(0.5);

  myButton = createButton('Keep pressing me')
  .mousePressed(()  => pressed = true)
  .mouseReleased(() => pressed = false);

  for(let i = 0; i<nbrPipe; i++){
  Pipe[i] = new Pipeline();
  
	if (pressed) i++;
   }

  
}

function draw() { 
  for(let i = 0; i<nbrPipe; i++){
    Pipe[i].move();    
    Pipe[i].display();
  }
  
}


class Pipeline{
  constructor(){
    this.x = random(width);
    this.y = random(height);
    this.diam = 5;
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.stroke = stroke(this.red,this.green,this.blue);
    this.speed = random(1);
    this.xDir = random(-2,2);
    this.yDir = random(-2,2);
	let timer = 2;
	
  } 
   
  move(){
    this.timer = round(millis());
    
    //on utilise le modulo, c'est à dire que si le timer est un multiple de 88, alors on entre dans la condition
    if (this.timer%88 == 0){
      this.xDir = random(-2, 2);
      this.yDir = random(-2, 2);
    }     
    this.x += (this.speed * this.xDir);
    this.y += (this.speed * this.yDir); 
    //print(this.x);
    
    if(this.x <= -this.diam || this.x >= width+this.diam || this.y <= -this.diam || this.y >= height+this.diam){
      this.x = random(width);
      this.y = random(height);
      this.red = random(255);
      this.green = random(255);
      this.blue = random(255);
    }    
  }
  
  display(){
   this.stroke = stroke(this.red,this.green,this.blue);
   ellipse(this.x, this.y, this.diam, this.diam);
  }
}





  function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  }
*/