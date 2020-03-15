  var jiggleee =[]; // array of jiggling eyes with the variable jiggleee

  /* references
     https://p5js.org/examples/math-arctangent.html
     http://simonemberton.panel.uwe.ac.uk/p5/semester_01/session_06/Task3/
  */

function setup() {  // draws everything inside it once
  var cnv = createCanvas(800, 800);  // canvas is created 800 pixels up and across
  cnv.style('display', 'block');                           // prevents scrollbars from appearing when size changes.
  cnv.parent('image3canvas');                               // designates 'canvasholder' as the parent for the canvas. Canvasholder is an id in the html file
  // Create objects.
  for (var i = 0; i < 70; i++) { // for the variable i, if i is less than 70, add another. This then pushes a new jiggleee into the array, creating more jiggling eyes.
    jiggleee.push(new Eye(random(width), random(height), random(10, 30)));  // adds a new jiggleee into the array. Each new thing uses the Eye class to create an Eye in a random location with semi-random size
  } // creates 70 eyes at random locations on the canvas with diameter sizes between 10 and 30 pixels.
}

// create new jiggling eye when mouse is pressed.
function mousePressed() { // function called mousePressed
  var r = random(10, 30); // variable r is a random number between 10 and 30
  var b = new Eye(mouseX, mouseY, r);  // variable b is a new object using the "Eye" class, the x and y positions use the current mouse x and y positions, while the size uses the variable r listed above.
  jiggleee.push(b); // adds(pushes) a new jiggling eye into the jiggleee array. 
}

function draw() {  // draw function loops everything inside it
  background(0); // black background
  // move and display all the objects.
  for (var i = 0; i < jiggleee.length; i++) {   // for variable i = 0, if i is less than the length of jiggleee variable, add one
    jiggleee[i].move();  // translates the object in a random direction
    jiggleee[i].update(mouseX, mouseY); // updates the jiggleee variable according to where the mouse is. Allows the eyes to follow the mouse.
    jiggleee[i].display(); // displays the new translation  
  }
  
}

class Eye{ // a class that creates an eye with ellipse inside, the smaller ellipse follows the mouse.
  constructor(tx,ty,ts){  // created object has three variables, tx, ty and ts. 
    this.x = tx;   // the "this" keyword relates only to this object instance. 
    this.y = ty;
    this.size = ts;
    this.speed = 2;
  }

  update = function(mx, my) {
    this.angle = atan2(my - this.y, mx - this.x);  // atan2 draws a line between the object and the cursor, changing the angle it is facing according to mouse position, updates the translation to reflect this. 
  };

  move() {
    this.x += random(-this.speed, this.speed); // random jitter in x and y directions.
    this.y += random(-this.speed, this.speed);
  }

  display = function() {  // displays the ellipses and rotates the smaller ellipse using push and pop to start and end a new drawing state.
    push(); 
    translate(this.x, this.y); // allows eyes to move at an x and y position other than 0,0
    fill(255); // white fill
    ellipse(0, 0, this.size, this.size); // creates an ellipse with variables for the size
    rotate(this.angle); // rotates according to update function above.
    fill(0); // black fill
    ellipse(this.size / 4, 0, this.size / 2, this.size / 2); // makes a smaller ellipse.
    pop();
  };
   
}