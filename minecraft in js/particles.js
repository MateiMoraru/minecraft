class Particle {
  constructor(startPos, amp, pc, cd, size, dir) {
    this.startPos = startPos;
    this.particles = [];
    this.color = pc;
    this.cd = cd;
    this.amp = amp;
    this.size = size;
    this.dir = dir;
    this.offsetX = 0;
    this.acceleration = 0.1;
    this.alpha = 255;
    this.createParticles();
    this.text = null;
    if(this.color[3])
      this.alpha = this.color[3];
    
    this.fade = 255;
    this.fadeSpeed = 1;
    this.willFade = false;
    
    //print(this.alpha)
  }
  
  setFade(f, fs)
  {
    this.fade = f;
    this.fadeSpeed = fs;
    this.willFade = true;
  }
  
  setAcceleration(v)
  {
    this.acceleration = v;
  }
  
  setText(t)
  {
    this.text = t;
  }
  
  setAlpha(a)
  {
    this.alpha = a;
  }

  createParticles() {
    for (let i = 0; i < this.amp * 2; i++) {
      this.particles.push([
        this.startPos[0],
        this.startPos[1],
        this.size,
        this.size,
        0,
        [this.dir[0] * random(-2, 2), this.dir[1] + random(-2, 2)],
        color(
          this.color[0] + random(-this.cd, this.cd),
          this.color[1] + random(-this.cd, this.cd),
          this.color[2] + random(-this.cd, this.cd),
          this.alpha
        ),
      ]);
    }
  }

  draw() {
    let speed = 0;
    if(keyIsDown(MOVEMENT_CONTROLS[2]))
    {
      speed -= 3;
    }
    else if(keyIsDown(MOVEMENT_CONTROLS[0]))
      {
        speed += 3;
      }
    
    if(keyIsDown(MOVEMENT_CONTROLS[3]))
      {
        speed *= 2;
      }
    
    this.offsetX += speed;
    for (let i = 0; i < this.particles.length; i++) {
      fill(red(this.particles[i][6]), green(this.particles[i][6]), blue(this.particles[i][6]), this.alpha);
      //fill(0);
      stroke(0, 0);
      rect(this.particles[i][0] + this.offsetX, this.particles[i][1], this.size, this.size);
      //print(this.particles[i][0], this.particles[i][1])
      this.particles[i][0] += this.particles[i][5][0] * abs(this.acceleration + 0.3);
      this.particles[i][1] += this.particles[i][4];
      this.particles[i][4] += this.acceleration;
      
      stroke(0, this.fade);
      fill(0, this.fade);
      
      if(this.text)
      text(this.text, this.particles[i][0] + this.offsetX, this.particles[i][1]);
      
      if(this.willFade)
        this.fade -= this.fadeSpeed;
      
    }
    if(!this.willFade || this.fade < 0)
      for (let i = 0; i < this.particles.length; i++) {
        if(random(1) > 0.9 || this.fade < 0)
          {
            this.particles.splice(i, 1)
          }
      }
  }
  
  exist()
  {
    return this.particles.length > 0
  }
}
