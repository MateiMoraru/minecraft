class Projectile
{
  constructor(x, y, dir, startVel, speed, damage, texture)
  {
    this.pos = [x, y];
    this.dir = dir;
    this.vel = startVel;
    this.speed = speed;
    this.damage = damage;
    this.texture = texture;
    this.collidePlayer = true;
    
  }
  
  setHeading(hp)
  {
    this.heading = hp;
  }
  
  setStartPos(sp)
  {
    this.startPos = sp;
  }
  
  attackPlayer(b)
  {
    this.collidePlayer = b;
  }
  
  update()
  {
    if(keyIsDown(MOVEMENT_CONTROLS[0])){
      if(!player.collidedLeft)
        this.pos[0] += 3;
    }
    if(keyIsDown(MOVEMENT_CONTROLS[2])){
            //this.projectiles[i][0] += player.changedOffset;
      if(!player.collidedRight)
        this.pos[0] -= 3;
    }
    
    this.pos[0] += this.speed * this.dir.x;
    this.pos[1] -= this.dir.y * this.speed;
    //this.pos[1] += this.vel;
    this.vel += 0.01;
    
    let rem = [false];
    if(this.collidePlayer)
      rem = this.collideWithPlayer();
    
    return rem;
  }
  
  draw()
  {
    push()
    translate(this.pos[0], this.pos[1]);
    //rectMode(CENTER);
    
    //print(hp[0], sp[0] + offset)
    
         
    if(this.heading[0] < this.startPos[0]){
      //rotate(createVector(-this.dir.x, this.dir.y + this.speed / 50).heading())
    }
    else
    {
      //rotate(createVector(this.dir.x, this.dir.y + this.speed / 50).heading())
    }
      image(this.texture, 0, 0);
      pop();
  }
  
  collideWithPlayer()
  {
    let bx, by, bw, bh, wx, wy, ww, wh;
    bx = player.pos[0];
    by = player.pos[1];
    bw = player.size[0];
    bh = player.size[1];

    wx = this.pos[0];
    wy = this.pos[1];
    ww = 15;
    wh = 15;
    
    //stroke(0);
    //fill(0, 0);
    //rect(wx, wy, ww, wh);
    if (
      (bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
      (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
      (bx + bw >= wx &&
        bx + bw < wx + ww &&
        by + bh >= wy &&
        by + bh < wy + wh) ||
      (bx >= wx && bx < wx + ww && by + bh > wy && by + bh < wy + wh)
    ) {
      player.getHit(this.damage);
      return true;
    }

    return false;
  }
}
