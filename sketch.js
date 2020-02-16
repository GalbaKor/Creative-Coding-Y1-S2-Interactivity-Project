function setup() {
	noCursor();
}

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);
}

function draw() {
	// put drawing code here
  	if (mouseIsPressed) {
  		fill(255,255,0);
  	} 
  	else {
  		fill(128,0,128);
  	}
  	if (mouseIsPressed) {
  	ellipse(mouseX, mouseY, 80, 80);
  }
 else {
 	quad(mouseX, mouseY, mouseX+60,mouseY+60,mouseX,mouseY+60,mouseX-60,mouseY);
 }
  }

  function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
  }
