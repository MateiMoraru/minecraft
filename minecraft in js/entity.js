class Entity {
  constructor(pos, size, texture, hp, id, speed) {
    this.pos = pos;
    this.size = size;
    this.texture = texture;
    this.colliders = [];
    this.collided = [];
    this.offset = 0;
    this.vel = 0;
    this.hp = hp;
    this.hitTime = 0;
    this.dir = 1;
    this.id = id;
    this.speed = speed;
    this.active = true;
    
    this.movementTimeout = 0;

    this.downCollider = [
      this.pos[0],
      this.pos[1] + this.size[1] - 5,
      this.size[0],
      5,
    ];

    this.rightCollider = [this.pos[0] + 5, this.pos[1], 5, this.size[1]];

    this.leftCollider = [
      this.pos[0] + this.size[0] - 5,
      this.pos[1],
      5,
      this.size[1],
    ];

    this.colliders[0] = this.downCollider;
    this.colliders[1] = this.rightCollider;
    this.colliders[2] = this.leftCollider;
    //this.colliders[3] = this.downCollider;
  }
  
    
  setActive(v)
  {
    this.active = false;
  }

  show() {
    push();
    translate(this.offset - this.size[0] / 2, 0);
    rectMode(CENTER);
    image(this.texture, this.pos[0], this.pos[1], this.size[0], this.size[1]);
    pop();
  }

  update(chunks, offset) {
    this.chunks = chunks;
    this.offset = offset;
    
    if(this.hitTime > -1)
      this.hitTime--;

    this.downCollider = [
      this.pos[0] + this.offset - this.size[0] / 2 + 5,
      this.pos[1] + this.size[1] - 5,
      this.size[0] - 10,
      5,
    ];

    this.rightCollider = [
      this.pos[0] + this.offset + this.size[0] / 2 - 10,
      this.pos[1] + 3,
      5,
      this.size[1] - 6,
    ];

    this.leftCollider = [
      this.pos[0] + this.offset - this.size[0] / 2 + 5,
      this.pos[1] + 3,
      5,
      this.size[1] - 6,
    ];

    this.colliders[0] = this.downCollider;
    this.colliders[1] = this.rightCollider;
    this.colliders[2] = this.leftCollider;

    this.collide(this.chunks, this.offset, this.colliders);

    //text(this.collided, 0, 100);

    if (!this.collided[0]) {
      this.vel += 0.1;
    } else {
      this.vel = 0;
    }

    if (this.collided[1]) {
      this.pos[0] -= this.speed;
    }

    if (this.collided[2]) {
      this.pos[0] += this.speed;
    }

    if (this.collided[2] && this.collided[1]) {
      this.pos[1] -= 3;
    }

    if(this.movementTimeout < 0 && this.active)
      this.AI();
    else
      this.movementTimeout--;

    //rect(this.colliders[0][0], this.colliders[0][1], this.colliders[0][2], this.colliders[0][3])
    //rect(this.colliders[1][0], this.colliders[1][1], this.colliders[1][2], this.colliders[1][3])
    //rect(this.colliders[2][0], this.colliders[2][1], this.colliders[2][2], this.colliders[2][3])

    this.pos[1] += this.vel;
  }

  collide(chunks, offset, collider) {
    this.collided[0] = false;
    this.collided[1] = false;
    this.collided[2] = false;
    this.collided[3] = false;
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i][0][0] + offset - this.pos[0] <= 17 * 30) {
        let idx = i;

        for (let j = 0; j < chunks[idx].length; j++) {
          let bx, by, bw, bh, wx, wy, ww, wh;
          for (let k = 0; k < collider.length; k++) {
            bx = collider[k][0];
            by = collider[k][1];
            bw = collider[k][2];
            bh = collider[k][3];
            wx = chunks[idx][j][0] + this.offset;
            wy = chunks[idx][j][1];
            ww = chunks[idx][j][2];
            wh = chunks[idx][j][3];

            if (
              (bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
              (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
              (bx + bw >= wx &&
                bx + bw < wx + ww &&
                by + bh >= wy &&
                by + bh < wy + wh) ||
              (bx >= wx && bx < wx + ww && by + bh > wy && by + bh < wy + wh)
            ) {
              this.collidedChunk = i;

              this.collidedBlockType = chunks[i][j][6];

              if (chunks[idx][j][6] == 1) {
                this.collided[k] = true;
              }
            }
          }
        }
      }
    }
  }

  changeDir() {
    this.dir = int(random(-2, 2));
    //print(this.dir);
  }

  inBoundries() {
    //if(this.id == "zombie")
    //print (this.id,
    //  this.pos[0] + this.offset > -this.size[0],
    //  this.pos[0] + this.offset < width,
    //  this.pos[1] > -this.size[1],
    //  this.pos[1] < height
    //);
    return (
      this.pos[0] + this.offset > -this.size[0] &&
      this.pos[0] + this.offset < width &&
      this.pos[1] > -this.size[1] &&
      this.pos[1] < height
    );
  }

  collision(collider) {
    let bx, by, bw, bh, wx, wy, ww, wh;
    bx = collider[0];
    by = collider[1];
    bw = collider[2];
    bh = collider[3];
    wx = this.pos[0] + this.offset;
    wy = this.pos[1];
    ww = this.size[0];
    wh = this.size[1];
    
    if (
      (bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
      (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
      (bx + bw >= wx &&
        bx + bw < wx + ww &&
        by + bh >= wy &&
        by + bh < wy + wh) ||
      (bx >= wx && bx < wx + ww && by + bh > wy && by + bh < wy + wh)
    ) {
      return true;
    }
    return false;
  }

  getAttacked(dp) {
    this.hp -= dp;
    this.hitTime = 100;
  }

  isAlive() {
    return this.hp > 0;
  }
  
  jump()
  {
    if(this.collided[0])
      {
        this.vel = -4
      }
  }
  
  setMovementTimeout(n)
  {
    this.movementTimeout = n;
  }
}
