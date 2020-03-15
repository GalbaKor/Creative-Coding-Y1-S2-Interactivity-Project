function setup() {          // draws everything inside it once at the start
  createCanvas(800,800);   // creates a canvas 800 pixel width and height
  

  for (let i = 0; i < height/8; i++){ //background horizontal lines
    x = 0;  // variable x changed to equal 0
    x2 = width; //variable x2 is the width of the canvas
    y = i*8;  // variable y has a value of variable i * 8
    line(x,y,x2,y);   // creates a series of horizontal lines from top to bottom of the screen using above variables
  }
  for (let i = 0; i < height/4; i++){ //top right double line
    x = (width/2-4) + i*4; //variable x is the canvas width divided by 2 -4 + variable i * 4. x starts in the middle of the canvas and moves to the right.
    y = 0; // variable y equals 0
    y2 = height/2; // variable y2 is the height divided by 2 so that it starts halfway down the canvas
    line(x,y,x,y2)    // creates a series of vertical lines in the top right quarter of the screen
  }
  for (let i = 0; i < height/4; i++){ //bottom right triple line
    strokeWeight(2);
    x = (width/2-4) + i*4; // variables same as above for statements. but y2 = the width of the canvas
    y = height/2;
    y2 = width;
    line(x,y,x,y2) // creates a series of vertical lines in the bottom right quarter of the screen with double line thickness
  }
  for (let i = 0; i < height/8; i++){ //bottom left vertical lines doubled
    strokeWeight(3);
    x = (width/2-4) - (i*9);  // ditto above with slight changes to create lines in the bottom left.
    y = height/2;
    y2 = width;
    line(x,y,x,y2) // creates a series of vertical lines in the bottom left quarter of the screen with triple line thickness
  }

    tLeftEye();
    tRightEye();
    bLeftEye();
    bRightEye();
    // each line draws the eye functions below
    
}

/* 
Each function creates a series of ellipses that form an eye. Positions are based on canvas height and width 
so that their positions stay relative to the size of the canvas
*/

 function tLeftEye(){  
  strokeWeight(1.5);
  fill(255);      ellipse(width/4,height/4,80,80);        // creates a white ellipse in the middle of the top left quarter of the canvas
  fill(0,50,255);  ellipse(width/4,height/4,60,60);       // blue filled ellipse in same position but smaller size
  fill(0);        ellipse(width/4,height/4,20,20);        // black ellipse in same position smaller size
  fill(255);      ellipse(width/4-20,height/4,10,20);
  fill(255);      ellipse(width/4-10,height/4-20,30,10);   // two offset white ellipses with different shapes
  }
function tRightEye(){
  fill(255);      ellipse(width*.75,height/4,80,80);    // same as above but using width*.75 to position in the middle of the right quarter of the canvas
  fill(0,150,50); ellipse(width*.75,height/4,60,60);
  fill(0);        ellipse(width*.75,height/4,20,20);
  fill(255);      ellipse(width*.75+20,height/4,10,20);
  fill(255);      ellipse(width*.75+10,height/4-20,30,10);  // same theory as for tLeftEye with mirrored offsets for the bottom two ellipses.
  }
function bRightEye(){
  fill(255);      ellipse(width*.75,height*.75,80,80);      // same as above but using width*.75 and height*.75 to position in the middle of the bottom right quarter of the canvas
  fill(100,25,0); ellipse(width*.75,height*.75,60,60);
  fill(0);        ellipse(width*.75,height*.75,20,20);
  fill(255);      ellipse(width*.75+20,height*.75,10,20);
  fill(255);      ellipse(width*.75+10,height*.75+20,30,10);  
  }
function bLeftEye(){
  fill(59); ellipse(width/4,height*.75,80,80);    // same as above but using width*4 and height*.75 to position in the middle of the bottom left quarter of the canvas
  fill(25); ellipse(width/4,height*.75,60,60);
  fill(0); ellipse(width/4,height*.75,20,20);
  fill(255); ellipse(width/4-20,height*.75,10,20);
  fill(255); ellipse(width/4-10,height*.75+20,30,10);
  }


