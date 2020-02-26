// Pipe class
class Pipe {
    constructor(startX, startY){                              
          this.pos = createVector(startX, startY)                 // constructs a shape at an x and y position with a radius of 10
          this.r = 10;
          this.vel = createVector(random(0.5,2.5),random(0.5,2.5)); /* to get x or y, do this.vel.x or this.vel.y */
          /*this.xVel = random(0.5,2.5);
          this.yVel = random(0.5,2.5);*/
          this.acc = createVector(0,0);
      this.mass = 2;                                          // mass of the object is 2
      var valr = document.getElementById("r").value;          // calls the value of the element with the id r, g and b and turns them into a variable
      var valg = document.getElementById("g").value;
      var valb = document.getElementById("b").value;
      stroke(valr, valg, valb);                               // above three variables are applied to stroke to form a colour.
    }
    
    contains(px, py) {                                  // checks to see if an x and y variable are between the edge of the object's radius and the
      let d = dist(px, py, this.pos.x, this.pos.y);     // center of the object
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