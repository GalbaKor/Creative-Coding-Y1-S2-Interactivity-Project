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
function mousePressed() {                                   
  for (let i = pipes.length - 1; i >= 0; i--) {             
    if (pipes[i].contains(mouseX, mouseY)) {                // calls the contains function from below, using the x and y coordinates of the mouse.
      pipes.splice(i, 1);                                   // if the contain function returns true, that object is cut out of the array
      popSound.play();                                      // plays the preloaded pop sound
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

