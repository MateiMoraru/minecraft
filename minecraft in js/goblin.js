class Goblin extends Entity
  {
    constructor(pos)
    {
      super(pos, [44, 60], blockTextures[48], 10, "goblin", 3);
      this.heading = [null, null];
      this.damage = 1;
      this.sleeping = false;
      this.particles = [];
    }
    
    setSleeping(b)
    {
      this.sleeping = b;
      
    }
    
    draw()
    {
      this.show();
      
      if(this.sleeping)
        if(random(1) > 1){
          this.particles.push(new Particle(this.pos, 1, [0, 0, 0, 0], 0, 30, [-1, random(-1, 1)]))
          this.particles[this.particles.length - 1].setAcceleration(-0.05);
          this.particles[this.particles.length - 1].setText("Z");
          this.particles[this.particles.length - 1].setAlpha(0);
          this.particles[this.particles.length - 1].setFade(255, 4);
        }
      
      if(dist(player.pos[0], player.pos[1], this.pos[0] + this.offset, this.pos[1]) < 8 * blockSize)
        {
          this.active = true;
          this.setSleeping(false);
        }
      else
        {
          this.active = false;
          this.setSleeping(true);
        }
      
      let idx = 0;
      for(let i = 0; i < this.particles.length; i++)
        {
          this.particles[idx].draw();
          if(!this.particles[idx].exist())
            {
              this.particles.splice(idx, 1)
              idx--;
            }
          
          idx++;
        }
      
    }
    
    updatePlayerPos(playerPos)
    {
      this.heading = playerPos;
    }
    
    AI()
    {
      if(this.heading[0] == null || this.heading[1] == null)
        {
          
        }
      else if(dist(this.pos[0] + this.offset + this.size[0] / 2, this.pos[1] + this.size[1] / 2, this.heading[0] + this.size[0] / 2, this.heading[1] + this.size[1] / 2) > 7 * blockSize)
        {
          
        }
      else
        {
           if(this.pos[0] + this.offset> this.heading[0])
             {
               this.pos[0] -= this.speed;
             }
          if(this.pos[0] + this.offset < this.heading[0])
            {
              this.pos[0] += this.speed;
            }
          if(this.pos[1] > this.heading[1] || this.collided[1] || this.collided[2])
            {
              this.jump();
            }
        }
    }
    
    dropUponDeath()
    {
      return [[31, int(random(1, 4))]];
    }

  }