class Zombie extends Entity
  {
    constructor(pos)
    {
      super(pos, [32, 64], blockTextures[30], 10, "zombie", 3);
      this.heading = [null, null];
      this.damage = 2;
    }
    
    draw()
    {
      this.show();
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