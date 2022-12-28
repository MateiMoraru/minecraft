class Sheep extends Entity
{
  constructor(pos)
  {
    super(pos, [32, 32], blockTextures[23], 10, "sheep", 3);
  }
  
  draw()
  {
    this.show();
  }
  
  dropUponDeath()
  {
    return [[24, int(random(1, 4))], [25, int(random(1, 4))]];
  }
  
  AI() {
    if (random(1) > 0.999) {
      this.changeDir();
    }
    
    if (this.hitTime < 0) {
      if (random(1) > 0.99) {
        this.pos[0] += this.dir * 6;
      }
      
      if (random(1) > 0.99) {
        if (this.collided[0]) {
          this.vel = -3;
        }
      }
    } else {
      if(random(1) > 0.99)
      {
        this.changeDir();
      }
      
      if (random(1) > 0.8) {
        this.pos[0] += this.dir * 12;
      }
      if (random(1) > 0.8) {
        if (this.collided[0]) {
          this.vel = -3;
        }
      }
    }
  }
}