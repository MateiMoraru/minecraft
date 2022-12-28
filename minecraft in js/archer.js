class Archer extends Entity
  {
    constructor(pos)
    {
      super(pos, [32, 84], blockTextures[45], 10, "archer", 3);
      this.bowTexture = blockTextures[46];
      this.arrowTexture = blockTextures[47];
      this.heading = [null, null];
      this.damage = 2;
      this.shootingDir = createVector(0, 0);
      this.projectiles = [];
      this.ableToShoot = 50;
      this.arrows = int(random(10, 50));
      this.shouldRun = false;
      this.dir = -1;
    }
    
    draw()
    {
      
      this.show();
      if(this.heading[0] > this.pos[0] + this.offset){
        push();
        translate(this.pos[0] + this.offset + this.size[0], this.pos[1] + this.size[1] / 1.5);
        rotate(createVector(-1, 0).heading())
        image(this.bowTexture, 0, 0);
        pop();
      }
      else
        image(this.bowTexture, this.pos[0] + this.offset - this.size[0], this.pos[1] + this.size[1] / 4.25);
      
      let idx = 0;
      
      for(let i = 0; i < this.projectiles.length; i++)
        {
          let rem = this.projectiles[idx].update();
          this.projectiles[idx].draw();
          
          if(rem)
            {
              this.projectiles.splice(idx);
              idx--;
            }
          
          idx++;
        }
      
      let cag = this.collideArrows();
      
      if(cag[0])
        {
          this.projectiles.splice(cag[3])
        }
    }
    
    updatePlayerPos(playerPos)
    {
      this.heading = playerPos;
      this.shootingDir = createVector(this.heading[0] - this.pos[0] + this.offset, this.pos[1] - this.heading[1]).normalize();
    }
    
    AI()
    {
      if(this.heading[0] == null || this.heading[1] == null)
        {
        }
      else if(dist(this.pos[0] + this.offset + this.size[0] / 2, this.pos[1] + this.size[1] / 2, this.heading[0] + this.size[0] / 2, this.heading[1] + this.size[1] / 2) > 15 * blockSize || dist(this.pos[0] + this.offset + this.size[0] / 2, this.pos[1] + this.size[1] / 2, this.heading[0] + this.size[0] / 2, this.heading[1] + this.size[1] / 2) < 8 * blockSize)
        {
        }
      else if(!this.shouldRun)
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
      
      if(this.shouldRun)
        {
          this.calcDir();

          if (random(1) > 0.8) {
            this.pos[0] += this.dir * 12;
          }
          if (random(1) > 0.8) {
            if (this.collided[0]) {
              this.vel = -3;
            }
          }
        }
      
      if(dist(this.pos[0] + this.offset + this.size[0] / 2, this.pos[1] + this.size[1] / 2, this.heading[0] + this.size[0] / 2, this.heading[1] + this.size[1] / 2) > 4 * blockSize && dist(this.pos[0] + this.offset + this.size[0] / 2, this.pos[1] + this.size[1] / 2, this.heading[0] + this.size[0] / 2, this.heading[1] + this.size[1] / 2) < 12 * blockSize)
          this.shootArrow();
    }
    
    calcDir()
    {
      this.dir = this.heading[0] - this.pos[0] + this.offset;
      
      if(this.dir > 0)
        this.dir = 1;
      else
        this.dir = -1;
    }
    
    collideArrows()
    {
      let chunks = terrain.getChunks();
      let offset = terrain.getOffset();
      
      for(let i = 0; i < chunks.length; i++)
        {
          for(let j = 0; j < chunks[i].length; j++)
            {
              for(let k = 0; k < this.projectiles.length; k++)
                {
                  let bx, by, bw, bh, wx, wy, ww, wh;
                  bx = this.projectiles[k].pos[0];
                  by = this.projectiles[k].pos[1];
                  bw = 15;
                  bh = 15;
                  wx = chunks[i][j][0] + offset;
                  wy = chunks[i][j][1];
                  ww = chunks[i][j][2];
                  wh = chunks[i][j][3];

                  if (
                    (bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
                    (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
                    (bx + bw >= wx &&
                      bx + bw < wx + ww &&
                      by + bh >= wy &&
                      by + bh < wy + wh) ||
                    (bx >= wx && bx < wx + ww && by + bh > wy && by + bh < wy + wh)
                  ) {
                      return [true, i, j, k];
                    }
                }
            }
        }
      
      return [false];
    }
    
    shootArrow()
    {
      if(this.ableToShoot < 0 && abs(this.vel) < 0.5 && this.arrows > 0)
        {
          this.projectiles.push(new Projectile(this.pos[0] + this.offset, this.pos[1] + this.size[1] / 2, this.shootingDir, (this.heading[1] - this.pos[1]) / 50, 5, 2,  this.arrowTexture));
          
          if(this.pos[0] + this.offset < this.heading[0])
            this.projectiles[this.projectiles.length - 1].speed *= -1;
          
          this.projectiles[this.projectiles.length - 1].setHeading(this.heading);
          this.projectiles[this.projectiles.length - 1].setStartPos([this.pos[0] + this.offset, this.pos[1] + this.size[1] / 2]);
          
          this.ableToShoot = 100;
          this.arrows--;
          this.shouldRun = this.arrows <= 0;
        }
      else
        this.ableToShoot--;
    }
    
    
    dropUponDeath()
    {
      let dropBow = random(1) > 0.1;
      if(!dropBow)
        return [[47, int(random(3, 13))]];
      else
        return [[47, int(random(3, 13))], [46, 1]];
    }

  }