const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;

let particles = [];
let eyes = [];
let springs = [];

let showSprings = false;

let w = 900;
let h = 600;

let bgColor = 255;
let num = 0;

function KeyPressed() {
  if (key== ' ') {

    showSprings = !showSprings;

    num+=1;

    if (num%2 ==0 ){
      bgColor = 255;
    }else{
      bgColor = 0;
    }
  }
}



function setup() {
  createCanvas(w, h);

  physics = new VerletPhysics2D();

  let bounds = new Rect (0, 0, width, height);
  physics. setWorldBounds (bounds);

  particles.push (new Particle(w/2-100, 100));
  particles.push (new Particle(w/2-50, 100));
  particles.push (new Particle(w/2, 100));
  particles.push (new Particle(w/2+50, 100));
  particles.push (new Particle(w/2+100, 100));

  particles.push (new Particle(w/2+50, 175));

  particles.push (new Particle(w/2+100, 250));
  particles.push (new Particle(w/2+25, 250));
  particles.push (new Particle(w/2, 250));
  particles.push (new Particle(w/2-25, 250));
  particles.push (new Particle(w/2-100, 250));

  particles.push (new Particle(w/2-50, 175));

  eyes.push (new Eyes (w/2-25, 150));
  eyes.push (new Eyes (w/2+25, 150));

  //feet
  eyes.push (new Eyes (w/2-25, 275));
  eyes.push (new Eyes (w/2+25, 275));

  for (let particle of particles) {
    springs.push (new Spring (particle, eyes[0], 0.01));
    springs.push (new Spring (particle, eyes[1], 0.01));
  }

  //feet
  springs.push (new Spring (eyes[2], particles[9], 0.01));
  springs.push (new Spring (eyes[3], particles[7], 0.01));
}

function draw() {
  background(bgColor);

  physics.update();

  fill(0);
  if (showSprings) fill(255);
  strokeWeight(2);
  beginShape();
  for (let particle of particles) {
    vertex (particle.x, particle.y);
  }
  endShape (CLOSE);

  eyes[0].show ();
  eyes[1].show ();

  //feet
  if (showSprings) stroke(255);
  strokeWeight (4);
  line(particles[9].x, particles[9].y, eyes[2].x, eyes[2].y);
  line(particles[7].x, particles[7].y, eyes[3].x, eyes[3].y);
  strokeWeight (16);
  point(eyes[2].x, eyes [2].y);
  point(eyes[3].x, eyes [3].y);

  if (showSprings) {
    for (let spring of springs) {
      spring.show ();
    }
  }

  if (mouseIsPressed) {
    eyes[3].lock();
    eyes[3].x = mouseX;
    eyes[3].y = mouseY;
    eyes[3].unlock();
  }
  }
