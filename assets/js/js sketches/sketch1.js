var r = function( p ) {
	p.setup = function() {
		p.createCanvas(window.innerWidth/1.75, window.innerHeight/1.75);
		p.noStroke();
		for (let i = 0; i < 300; i++) { 
			if (i <= 150 == true){ 
				p.fill(p.random(255),0,0,p.random(255)); 
			} else { 
				p.fill(0,p.random(255),0,p.random(255)); 
			}
			p.ellipse(p.random(window.innerWidth/1.75), p.random(window.innerHeight/1.75), p.random(100));  																  
		}; 
	};
};
var myp5 = new p5(r, 'c1');


var s = function( p ) {

	p.setup = function() {
		p.createCanvas(window.innerWidth/1.75, window.innerHeight/1.75); 
		for (let i = 0; i < (window.innerHeight/1.75)/8; i++){ 
		  x = 0;  
		  x2 = window.innerWidth/1.75; 
		  y = i*8;
		  p.line(x,y,x2,y) 
		}
		for (let i = 0; i < (window.innerHeight/1.75)/4; i++){ 
		  x = ((window.innerWidth/1.75)/2-4) + i*4; 
		  y = 0;
		  y2 = (window.innerHeight/1.75/2); 
		  p.line(x,y,x,y2)
		}
		for (let i = 0; i < window.innerHeight/1.75/4; i++){
		  p.strokeWeight(2)
		  x = ((window.innerWidth/1.75)/2-4) + i*4;
		  y = window.innerHeight/1.75/2;
		  y2 = window.innerWidth/1.75;
		  p.line(x,y,x,y2)
		}
		for (let i = 0; i < window.innerHeight/1.75/8; i++){
		  p.strokeWeight(3)
		  x = (window.innerWidth/1.75/2-4) - (i*9); 
		  y = (window.innerHeight/1.75)/2;
		  y2 = window.innerWidth/1.75;
		  p.line(x,y,x,y2) 
		}
		  tLeftEye() 
		  tRightEye() 
		  bLeftEye() 
		  bRightEye() 
	}

	function tLeftEye(){  
		p.strokeWeight(1.5);
		p.fill(255);       p.ellipse((window.innerWidth/1.75)/4,(window.innerHeight/1.75)/4,80,80);    
		p.fill(0,50,255);  p.ellipse((window.innerWidth/1.75)/4,(window.innerHeight/1.75)/4,60,60);     
		p.fill(0);         p.ellipse((window.innerWidth/1.75)/4,(window.innerHeight/1.75)/4,20,20);      
		p.fill(255);       p.ellipse((window.innerWidth/1.75)/4-20,(window.innerHeight/1.75)/4,10,20);
		p.fill(255);       p.ellipse((window.innerWidth/1.75)/4-10,(window.innerHeight/1.75)/4-20,30,10);  
	}
	function tRightEye(){
		p.fill(255);      p.ellipse((window.innerWidth/1.75)*.75,(window.innerHeight/1.75)/4,80,80);  
		p.fill(0,150,50); p.ellipse((window.innerWidth/1.75)*.75,(window.innerHeight/1.75)/4,60,60);
		p.fill(0);        p.ellipse((window.innerWidth/1.75)*.75,(window.innerHeight/1.75)/4,20,20);
		p.fill(255);      p.ellipse((window.innerWidth/1.75)*.75+20,(window.innerHeight/1.75)/4,10,20);
		p.fill(255);      p.ellipse((window.innerWidth/1.75)*.75+10,(window.innerHeight/1.75)/4-20,30,10);  
	}
	function bRightEye(){
		p.fill(255);      p.ellipse((window.innerWidth/1.75)*.75,(window.innerHeight/1.75)*.75,80,80);    
		p.fill(100,25,0); p.ellipse((window.innerWidth/1.75)*.75,(window.innerHeight/1.75)*.75,60,60);
		p.fill(0);        p.ellipse((window.innerWidth/1.75)*.75,(window.innerHeight/1.75)*.75,20,20);
		p.fill(255);      p.ellipse((window.innerWidth/1.75)*.75+20,(window.innerHeight/1.75)*.75,10,20);
		p.fill(255);      p.ellipse((window.innerWidth/1.75)*.75+10,(window.innerHeight/1.75)*.75+20,30,10);  
	}
	function bLeftEye(){
		p.fill(59);  p.ellipse((window.innerWidth/1.75)/4,(window.innerHeight/1.75)*.75,80,80);    
		p.fill(25);  p.ellipse((window.innerWidth/1.75)/4,(window.innerHeight/1.75)*.75,60,60);
		p.fill(0);   p.ellipse((window.innerWidth/1.75)/4,(window.innerHeight/1.75)*.75,20,20);
		p.fill(255); p.ellipse((window.innerWidth/1.75)/4-20,(window.innerHeight/1.75)*.75,10,20);
		p.fill(255); p.ellipse((window.innerWidth/1.75)/4-10,(window.innerHeight/1.75)*.75+20,30,10);
	}
}
var myp5 = new p5(s, 'c2');


var t = function( p ) {

	var jiggleee =[];

	p.setup = function() { 
		p.createCanvas(window.innerWidth/1.75, window.innerHeight/1.75);  
		for (var i = 0; i < 70; i++) { 
			jiggleee.push(new Eye(p.random(window.innerWidth/1.75), p.random(window.innerHeight/1.75), p.random(10, 30)));
		} 
	}
	p.mousepressed = function() {
		var r = p.random(10, 30);
		var b = new Eye(mouseX, mouseY, r); 
		jiggleee.push(b);
	}

	p.draw = function() {

		p.background(0);
		for (var i = 0; i < jiggleee.length; i++) {
			jiggleee[i].move();
			jiggleee[i].update(mouseX, mouseY);
			jiggleee[i].display();
		}

	}

	class Eye{
		constructor(tx,ty,ts){ 
		this.x = tx;
		this.y = ty;
		this.size = ts;
		this.speed = 2;
	}

	update(mx, my) {
		this.angle = atan2(my - this.y, mx - this.x);
	};

	move() {
		this.x += p.random(-this.speed, this.speed);
		this.y += p.random(-this.speed, this.speed);
	}

	display() {
		p.push(); 
		p.translate(this.x, this.y);
		p.fill(255);
		p.ellipse(0, 0, this.size, this.size);
		p.rotate(this.angle);
		p.fill(0);
		p.ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
		p.pop();
	};
	}
}
var myp5 = new p5(t, 'c3');


