
function setup() { // dictates what runs on startup
  
	var cnv = createCanvas(800,800); // creates a canvas with 800 pixels across and up
	cnv.style('display', 'block');                           // prevents scrollbars from appearing when size changes.
	cnv.parent('image1canvas');                               // designates 'canvasholder' as the parent for the canvas. Canvasholder is an id in the html file
	background(255)
	for (let i = 0; i < width; i++){  // for loop with nesting, if i is less than the canvas width, add another of whatever is in the curly brackets
		for (let x = 0; x < width*2; x++){  // x starts at 0, if it's less than the canvas width, add one.
			let y = random(1,height) // the variable y is a random number between 1 and the height of the canvas.
			stroke(0)
			line(x,y,x,y); // creates a line each time the for loop runs using the above variables. Places a dot somewhere on the canvas.
		}
	}
	for (let i = 0; i < 300; i++) { // if i is less than 300, add one ellipse with a red and black colour palette and a random alpha channel.
	    if (i <= 150 == true){ // if i is less than or equal to 150..
			fill(random(255),0,0,random(155,255)); //fill with red
		} else { // if i is over 150
			fill(0,random(255),0,random(155,255)); // fill with green
		}
		ellipse(random(windowWidth), random(windowHeight), random(100));  // ellipses have a random size up to 100 pixels and...
																		  // ...can appear in a random location on the canvas x and y axis.
 	 }
}


