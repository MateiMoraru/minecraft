var USERNAME = "scarecrow";

class Player {
  constructor() {
    this.pos = [width / 2, 100];
    this.size = [30, 60];
    this.vel = 0;
    this.collidedBottom = false;
    this.changedOffset = 0;
    this.inventory = [[41, 1], [46, 1], [47, 50]];
    this.inventorySlots = 5;
    this.selectedInventoryItem = 0;
    this.ableToPlaceBlock = true;
    this.openedInventory = false;
    this.hiddenInventory = [];
    this.hiddenInventorySize = 60;
    this.itemSwapDelay = 0;
    this.flashlightPower = 5;
    this.lightSource = [0, 2]
    this.blockDropsExceptions = [
      [0, 1],
      [15, 16],
      [17, 18],
      [32, 33],
      [34, 35],
      [36, 37]
    ];
    this.collidedChunk = 0;
    this.particles = [];
    this.breakBlockExceptions = [
      [2, 19],
      [15, 19],
      [17, 19],
      [2, 20],
      [15, 20],
      [17, 20],
      [2, 21],
      [15, 21],
      [17, 21],
      [32, 39]
      
    ];
    this.craftingTable = new CraftingTable();
    this.openedCraftingTable = false;
    this.collidedBlockType = 1;
    this.openedChest = false;
    this.collidedBlock = 2;
    this.openedChestIdx = -1;
    this.chests = [];
    this.blockSize = 30;
    this.damagePoints = 1;
    this.weaponStats = [
      [19, 2.5],
      [20, 1.5],
      [21, 2],
      [26, 2.5],
      [27, 3.5],
      [28, 5],
    ];
    this.healthPoints = 20;
    this.food = [
      [25, 2],
      [31, 0.2],
    ];
    
    this.hasLightSource = false;
    this.lightSources = [[12, 1.2],
                         [44, 3]];
    
    this.projectiles = [];
    
  }

  draw() {
    this.itemSwapDelay--;
    stroke(214, 195, 118);
    fill(214, 195, 118);
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

    fill(61, 44, 35);
    rect(0, height - 40, 6 * 30, 40);

    fill(255, 100);
    rect(this.selectedInventoryItem * 35 + 2.5, height - 35 - 2.5, 35, 35);

    if (this.inventory[this.selectedInventoryItem]) {
      //blockTextures[this.inventory[this.selectedInventoryItem][0]].resize(15, 15)
      image(
        blockTextures[this.inventory[this.selectedInventoryItem][0]],
        this.pos[0] + this.size[0] - 7.5,
        this.pos[1] + this.size[1] / 5,
        25,
        25
      );
    }

    let idx = 0;
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[idx].draw();

      if (!this.particles[idx].exist()) {
        this.particles.splice(idx, 1);
        idx--;
      }
      idx++;
    }
    
    idx = 0;
    
    for(let i = 0; i < this.projectiles.length; i++)
        {
          this.projectiles[idx].update();
          this.projectiles[idx].draw();
          
          idx++;
        }

    for (let i = 0; i < this.inventory.length; i++) {
      //fill(BLOCKCOLORS[this.inventory[i][0]])
      //rect(i * 35 + 5, height - 35, 30, 30);

      image(blockTextures[this.inventory[i][0]], i * 35 + 5, height - 35);

      fill(0);
      stroke(0);
      text(
        this.inventory[i][1],
        i * 35 + 15 - str(this.inventory[i][1]).length / 1.3,
        height - 15
      );
    }

    if (this.openedInventory) {
      stroke(214, 195, 118);
      fill(0, 200);
      rect(0, 0, width, height);

      fill(61, 44, 35);
      rect(width / 5, height / 5, width / 1.75, height / 1.75);

      rect(width / 1.62, height / 5, 10, height / 1.75);

      fill(0);
      stroke(0);
      textSize(30);
      text("Inventory", width / 2 - 180, height / 5 + 25);
      text("Crafting", width / 2 + 255, height / 5 + 25);

      let y = height / 5;
      let x = width / 5 + 30;

      fill(140, 140, 140);

      for (let i = 0; i < PLAYER_CRAFTING_RECEPIES.length; i++) {
        image(
          blockTextures[
            PLAYER_CRAFTING_RECEPIES[i][
              PLAYER_CRAFTING_RECEPIES[i].length - 1
            ][0]
          ],
          width / 2 + 200,
          height / 5 + 50 * (i + 1)
        );

        if (
          this.collideBlock(
            [mouseX, mouseY, 5, 5],
            [width / 2 + 200, height / 5 + 50 * (i + 1), 30, 30]
          )
        ) {
          let c = craft(this.inventory, this.hiddenInventory, i);

          if (c[0] >= 0 && mouseIsPressed && mouseButton == LEFT) {
            this.addBlockToInventory(c[0], c[1]);
            this.removeBlockFromInventory(c[2]);
          }
        }
      }

      for (let i = 0; i < this.hiddenInventory.length; i++) {
        if (i % 10 == 0) {
          y += 65;
          x = width / 5 + 30;
        }
        stroke(214, 195, 118);
        //fill(BLOCKCOLORS[this.hiddenInventory[i][0]]);
        //rect(x, y, 30, 30);
        image(blockTextures[this.hiddenInventory[i][0]], x, y);

        fill(0);
        stroke(0);
        textSize(15);
        text(
          this.hiddenInventory[i][1],
          x + 10 - str(this.hiddenInventory[i][1]).length / 1.3,
          y + 20
        );

        if (
          this.itemSwapDelay <= 0 &&
          this.collideBlock([mouseX, mouseY, 5, 5], [x, y, 30, 30])
        ) {
          if (keyIsDown(NUMBERS[0][0])) {
            let tinv = this.inventory[0];

            this.inventory[0] = this.hiddenInventory[i];
            this.hiddenInventory[i] = tinv;

            this.itemSwapDelay = 20;
          }

          if (keyIsDown(NUMBERS[1][0])) {
            let tinv = this.inventory[1];

            this.inventory[1] = this.hiddenInventory[i];
            this.hiddenInventory[i] = tinv;

            this.itemSwapDelay = 20;
          }

          if (keyIsDown(NUMBERS[2][0])) {
            let tinv = this.inventory[2];

            this.inventory[2] = this.hiddenInventory[i];
            this.hiddenInventory[i] = tinv;

            this.itemSwapDelay = 20;
          }

          if (keyIsDown(NUMBERS[3][0])) {
            let tinv = this.inventory[3];

            this.inventory[3] = this.hiddenInventory[i];
            this.hiddenInventory[i] = tinv;

            this.itemSwapDelay = 20;
          }

          if (keyIsDown(NUMBERS[4][0])) {
            let tinv = this.inventory[4];

            this.inventory[4] = this.hiddenInventory[i];
            this.hiddenInventory[i] = tinv;

            this.itemSwapDelay = 20;
          }
        }

        x += 65;
      }
    } else if (this.openedCraftingTable) {
      this.craftingTable.draw();
      this.craftingTable.update();
    } else if (this.openedChest) {
      this.chests[this.openedChestIdx].draw();

      let addInv = this.chests[this.openedChestIdx].addToInventory();

      if (addInv[0]) {
        if (this.hiddenInventory.length < 100)
          {
            this.addBlockToInventory(addInv[2][0], 1);
          }
      }
    }
  }

  update(terrain) {
    let chunks = terrain.getChunks();
    let offset = terrain.getOffset();
    let entities = terrain.getEntities();
    this.chunks = chunks;
    this.offset = offset;
    this.chests = terrain.getChests();
    
    let ar = this.collideArrows();

    if(ar[0])
      this.projectiles.splice(ar[3])
    
    if (this.healthPoints < 0) {
      this.died(terrain);
      sounds[7].play();
    }

    this.damagePoints = 1;

    if (this.inventory[this.selectedInventoryItem])
      for (let i = 0; i < this.weaponStats.length; i++)
        if (
          this.inventory[this.selectedInventoryItem][0] ==
          this.weaponStats[i][0]
        ) {
          this.damagePoints = this.weaponStats[i][1];
        }

    this.changedOffset = 0;

    this.flashlightPower = time / 10;

    this.bottomCollider = [
      this.pos[0] + 7,
      this.pos[1] + this.size[1] - 5,
      this.size[0] - 14,
      5,
    ];
    this.leftCollider = [
      this.pos[0],
      this.pos[1] + 5,
      this.size[0] / 2,
      this.size[1] - 10,
    ];
    this.rightCollider = [
      this.pos[0] + this.size[0] / 2,
      this.pos[1] + 5,
      this.size[0] / 2,
      this.size[1] - 10,
    ];
    this.upCollider = [this.pos[0] + 5, this.pos[1], this.size[0] - 10, 5];
    this.mouseCollider = [mouseX, mouseY, 2, 2];

    this.collidedBottom = this.collide(
      chunks,
      this.bottomCollider,
      offset,
      true
    );
    if (keyIsDown(MOVEMENT_CONTROLS[0]) && offset < 0) {
      //print(13123123)
      this.collidedLeft = this.collide(chunks, this.leftCollider, offset);
      if (this.collidedBlockType == -1) {
        this.changedOffset -= 1.5;
      }
    }

    if (keyIsDown(MOVEMENT_CONTROLS[2])) {
      this.collidedRight = this.collide(chunks, this.rightCollider, offset);
      if (this.collidedBlockType == -1) {
        this.changedOffset += 1.5;
      }
    }

    let collideEntities = this.collideWithEntities(entities);

    if (this.vel != 0)
      this.collidedUp = this.collide(chunks, this.upCollider, offset, 2);

    this.collidedMouse = [false];
    if (mouseIsPressed && mouseButton == LEFT)
      this.collidedMouse = this.breakBlock(chunks, this.mouseCollider, offset);

    if (!this.collidedMouse[0]) {
      //this.attack(terrain.getEntities());
    }

    if (!this.collidedBottom) {
      if (this.collidedBlockType == -1) {
        this.vel += 0.05;
      } else {
        this.vel += 0.1;
      }
    } else {
      this.vel = 0;
    }

    if (this.collidedUp && !(this.collidedLeft && this.collidedRight)) {
      this.vel = -this.vel;
      this.pos[1] += 5;
    }

    if (this.collidedBottom && keyIsDown(MOVEMENT_CONTROLS[1])) {
      if (this.collidedBlockType != -1) this.vel = -4;
      else {
        this.vel = -2;
      }
    }

    if (this.collidedRight && terrain.speed < 0) {
      this.changedOffset += 3;
    }

    if (this.collidedLeft && terrain.speed > 0) {
      this.changedOffset += -3;
    }
    if (keyIsDown(MOVEMENT_CONTROLS[3])) {
      this.changedOffset *= 2;
    }

    if (keyIsDown(MOVEMENT_CONTROLS[2]) && this.collidedBottom) {
      this.particles.push(
        new Particle(
          [this.pos[0] + this.size[0] / 2, this.pos[1] + this.size[1]],
          2,
          BLOCKCOLORS[this.collidedBlock],
          3,
          5,
          [1, 1]
        )
      );
    }
    if (keyIsDown(MOVEMENT_CONTROLS[0]) && this.collidedBottom) {
      //print(this.collidedBlockType)
      this.particles.push(
        new Particle(
          [this.pos[0] + this.size[0] / 2, this.pos[1] + this.size[1]],
          2,
          BLOCKCOLORS[this.collidedBlock],
          3,
          5,
          [-1, 1]
        )
      );
    }

    this.pos[1] += this.vel;
  }

  placeBlock(chunks, offset) {
    if (this.inventory[this.selectedInventoryItem]) {
      let x = int((mouseX - offset) / 30) * 30;
      let y = int(mouseY / 30) * 30;

      let coll = this.collideMouse(chunks, offset);
      let place = !(
        !coll[0] &&
        dist(
          x + offset,
          y,
          this.pos[0] + this.size[0] / 2,
          this.pos[1] + this.size[1] / 2
        ) <
          5 * 30
      );

      if (!place) this.inventory[this.selectedInventoryItem][1]--;

      let r = [
        place,
        this.collidedChunk,
        [x, y, 30, 30, this.inventory[this.selectedInventoryItem][0], null, 1],
      ];

      if (this.inventory[this.selectedInventoryItem][0] == 12) {
        r[2][6] = 0;
      }

      if (!place)
        this.particles.push(
          new Particle(
            [x + 15 + offset, y + 0],
            5,
            BLOCKCOLORS[this.inventory[this.selectedInventoryItem][0]],
            3,
            5,
            [-1, 1]
          )
        );
      
      if(!place)
        {
          sounds[3].play();
        }

      if (this.inventory[this.selectedInventoryItem][1] < 1) {
        this.inventory.splice(this.selectedInventoryItem, 1);
        return r;
      }

      return r;
    }

    return [true, -1, -1];
  }

  getCollidedMouse() {
    return this.collidedMouse;
  }

  addBlockToInventory(blockId, nr) {
    let containsBlockId = false;
    let idx = 0;

    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i][0] == blockId && this.inventory[i][1] < 64) {
        containsBlockId = true;
        idx = i;
        break;
      }
    }

    if (containsBlockId) {
      this.inventory[idx][1] += 1;
      if (nr) {
        this.inventory[idx][1] += nr - 1;
      }
    } else if (this.inventory.length < this.inventorySlots) {
      this.inventory.push([blockId, 1]);
      if (nr) {
        this.inventory[this.inventory.length - 1][1] += nr - 1;
      }
    } else {
      let containsBlockId = false;
      let idx = 0;

      for (let i = 0; i < this.hiddenInventory.length; i++) {
        if (
          this.hiddenInventory[i][0] == blockId &&
          this.hiddenInventory[i][1] < 64
        ) {
          containsBlockId = true;
          idx = i;
          break;
        }
      }

      if (containsBlockId) {
        this.hiddenInventory[idx][1] += 1;
        if (nr) {
          this.hiddenInventory[idx][1] += nr - 1;
        }
      } else {
        this.hiddenInventory.push([blockId, 1]);
        if (nr) {
          this.hiddenInventory[this.hiddenInventory.length - 1][1] += nr - 1;
        }
      }
    }
  }

  breakBlock(chunks, collider, offset) {
    for (let i = 0; i < chunks.length; i++) {
      if (
        dist(chunks[i][0][0] + offset, chunks[i][0][1], mouseX, mouseY) <
        16 * 30
      ) {
        for (let j = 0; j < chunks[i].length; j++) {
          let bx, by, bw, bh, wx, wy, ww, wh;
          bx = collider[0];
          by = collider[1];
          bw = collider[2];
          bh = collider[3];
          wx = chunks[i][j][0] + offset;
          wy = chunks[i][j][1];
          ww = chunks[i][j][2];
          wh = chunks[i][j][3];

          //stroke(0);
          //fill(0, 0);
          //rect(wx, wy, ww, wh);

          if (
            ((bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
              (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
              (bx + bw >= wx &&
                bx + bw < wx + ww &&
                by + bh >= wy &&
                by + bh < wy + wh) ||
              (bx >= wx &&
                bx < wx + ww &&
                by + bh > wy &&
                by + bh < wy + wh)) &&
            dist(
              chunks[i][j][0] + chunks[i][j][2] / 2 + offset,
              chunks[i][j][1] + chunks[i][j][3] / 2,
              this.pos[0] + this.size[0] / 2,
              this.pos[1] + this.size[1] / 2
            ) <
              5 * 30 && chunks[i][j][6] != -2
          ) {
            let drop = chunks[i][j][4];
            let matched = true;

            for (let k = 0; k < this.breakBlockExceptions.length; k++) {
              if (this.breakBlockExceptions[k][0] == drop) {
                matched = false;
                if(this.inventory[this.selectedInventoryItem])
                if (
                  this.breakBlockExceptions[k][1] ==
                  this.inventory[this.selectedInventoryItem][0]
                ) {
                  matched = true;
                  break;
                }
                
              }
            }

            for (let k = 0; k < this.blockDropsExceptions.length; k++) {
              if (chunks[i][j][4] == this.blockDropsExceptions[k][0]) {
                drop = this.blockDropsExceptions[k][1];
                break;
              }
            }
            if (matched) {
              sounds[2].play();
              this.addBlockToInventory(drop, 1);
              return [true, i, j];
            }
          }
        }

        return [false];
      }
    }

    return [false];
  }

  keyPress(key) {
    if (keyCode == KEYS[0]) {
      this.selectedInventoryItem--;

      if (this.selectedInventoryItem < 0) this.selectedInventoryItem = 4;
    } else if (keyCode == KEYS[1]) {
      this.selectedInventoryItem++;

      if (this.selectedInventoryItem > 4) this.selectedInventoryItem = 0;
    }
    if (keyCode == KEYS[4]) {
      this.openedInventory = !this.openedInventory;
      this.openedCraftingTable = false;
    }

    if (keyCode == KEYS[2]) {
      if (this.openedCraftingTable) {
        this.openedCraftingTable = false;
      }

      this.collidedMouse = this.collideMouse(this.chunks, this.offset);

      if (
        this.collidedMouse[0] &&
        this.chunks[this.collidedMouse[1]][this.collidedMouse[2]][4] == 11
      ) {
        this.openedCraftingTable = true;
        this.openedInventory = false;
        this.openedChest = false;
      }
    }

    if (keyCode == KEYS[3]) {
      if (this.openedChest) {
        this.openedChest = false;
      }

      this.collidedMouse = this.collideMouse(this.chunks, this.offset);

      if (
        this.collidedMouse[0] &&
        this.chunks[this.collidedMouse[1]][this.collidedMouse[2]][4] == 22
      ) {
        sounds[6].play();
        this.openedChest = true;
        this.openedInventory = false;
        this.openedCraftingTable = false;
        this.openedChestIdx = this.chunks[this.collidedMouse[1]][
          this.collidedMouse[2]
        ][7];
      }
    }
  }

  collideMouse(chunks, offset) {
    let collider = [mouseX, mouseY, 5, 5];
    for (let i = 0; i < chunks.length; i++) {
      if (
        dist(chunks[i][0][0] + offset, chunks[i][0][1], mouseX, mouseY) <
        16 * 30
      ) {
        for (let j = 0; j < chunks[i].length; j++) {
          let bx, by, bw, bh, wx, wy, ww, wh;
          bx = collider[0];
          by = collider[1];
          bw = collider[2];
          bh = collider[3];
          wx = chunks[i][j][0] + offset;
          wy = chunks[i][j][1];
          ww = chunks[i][j][2];
          wh = chunks[i][j][3];

          //stroke(0);
          //fill(0, 0);
          //rect(wx, wy, ww, wh);

          if (
            ((bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
              (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
              (bx + bw >= wx &&
                bx + bw < wx + ww &&
                by + bh >= wy &&
                by + bh < wy + wh) ||
              (bx >= wx &&
                bx < wx + ww &&
                by + bh > wy &&
                by + bh < wy + wh)) &&
            dist(
              chunks[i][j][0] + chunks[i][j][2] / 2 + offset,
              chunks[i][j][1] + chunks[i][j][3] / 2,
              this.pos[0] + this.size[0] / 2,
              this.pos[1] + this.size[1] / 2
            ) <
              5 * 30
          ) {
            return [true, i, j];
          }
        }

        return [false];
      }
    }

    return [false];
  }

  collide(chunks, collider, offset, bcoll) {
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i][0][0] + offset - this.pos[0] <= 17 * 30) {
        let idx = i;
        if (true) {
          if (
            chunks[i][0][0] + offset - this.pos[0] >
            chunks[i + 1][0][0] - offset - this.pos[0]
          ) {
            idx++;
          }
        }
        for (let j = 0; j < chunks[idx].length; j++) {
          let bx, by, bw, bh, wx, wy, ww, wh;
          bx = collider[0];
          by = collider[1];
          bw = collider[2];
          bh = collider[3];
          wx = chunks[idx][j][0] + offset;
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
            if (bcoll == true) this.collidedChunk = i;

            if (bcoll == true) {
              this.collidedBlock = chunks[idx][j][4];
              //this.collidedBlockType = chunks[i][j][6];
            }
            
            if(bcoll == 2)
              this.collidedBlockType = chunks[i][j][6];

            

            if (chunks[idx][j][6] == 1) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  collideBlock(b1, b2) {
    let bx, by, bw, bh, wx, wy, ww, wh;
    bx = b1[0];
    by = b1[1];
    bw = b1[2];
    bh = b1[3];

    wx = b2[0];
    wy = b2[1];
    ww = b2[2];
    wh = b2[3];
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
      return true;
    }

    return false;
  }

  removeBlockFromInventory(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.inventory[arr[i]][1]--;

      if (this.inventory[arr[i]][1] <= 0) {
        this.inventory.splice(arr[i], 1);
      }
    }
  }

  attack(entities) {
    for (let i = 0; i < entities.length; i++) {
      if (
        entities[i].inBoundries() &&
        dist(
          entities[i].pos[0] + entities[i].size[0] / 2 + entities[i].offset,
          entities[i].pos[1] + entities[i].size[1] / 2,
          this.pos[0] + this.size[0] / 2,
          this.pos[1] + this.size[1] / 2
        ) <
          5 * this.blockSize
      )
        if (entities[i].collision([mouseX, mouseY, 5, 5])) {
          sounds[1].play();
          entities[i].getAttacked(this.damagePoints);

          if (!entities[i].isAlive()) {
            if (this.healthPoints < 20) {
              this.healthPoints += 2;
            }
          }
        }
    }
  }

  drawHealthHearts() {
    for (let i = 0; i < this.healthPoints; i += 2) {
      image(blockTextures[29], width - 30 * 10 + (i / 2) * 30, 10, 25, 25);
    }
  }

  collideWithEntities(entities) {
    for (let i = 0; i < entities.length; i++) {
      if (
        entities[i].collision([
          this.pos[0],
          this.pos[1],
          this.size[0],
          this.size[1],
        ])
      ) {
        if ((entities[i].id == "zombie" || entities[i].id == "goblin") && entities[i].movementTimeout < 0) {
          this.healthPoints -= entities[i].damage;
          if (entities[i].pos[0] < this.pos[0]) {
            this.changedOffset += 3;
          } else {
            this.changedOffset -= 3;
          }
          sounds[1].play();
          entities[i].setMovementTimeout(50);
        }
      }
    }
  }
  
  getHit(damage)
  {
    this.healthPoints -= damage;
    sounds[1].play();
  }

  died(terrain) {
    //terrain.addChest(this.inventory + this.hiddenInventory, this.collidedChunk - 0, [-terrain.getOffset() + this.pos[0], this.pos[1]]);
    this.pos[1] = 0

    this.chests = terrain.getChests();
    
    chat_box.addMessage("Player " + USERNAME + " died in the " + dimension, true)
    
    dimension = "overworld";

    this.healthPoints = 20;
    this.inventory = [];
    this.hiddenInventory = [];

    terrain.offsetX = 0;
    terrain.azamatOffset = 0;
    terrain.killEntities();
  }

  eat() {
    if (this.inventory[this.selectedInventoryItem]) {
      for (let i = 0; i < this.food.length; i++) {
        if (this.inventory[this.selectedInventoryItem][0] == this.food[i][0]) {
          if (this.healthPoints < 20) {
            this.healthPoints += this.food[i][1];
            
            this.removeFromInventory(this.selectedInventoryItem, 1)
            
            return true;
          }
        }
      }
    }

    return false;
  }
  
  removeFromInventory(idx, amount)
  {
    this.inventory[idx][1] -= amount;
    
    if(this.inventory[idx][1] <= 0)
      this.inventory.splice(idx);
  }
  
  teleport(x, y)
  {
    this.pos = [x, y];
  }
  
  usePortal()
  {
    let element = this.collideMouse(this.chunks, this.offset);
    if(element[0]){
      if(this.chunks[element[1]][element[2]][4] == 41)
        {
          return true;
        }
    }
    return false;
  }
  
  checkIfPlayerHasALightSource()
  {
    for(let i = 0; i < this.inventory.length; i++)
      {
        for(let j = 0; j < this.lightSources.length; j++){
          if(this.inventory[i][0] == this.lightSources[j][0])
            {
              this.lightSource = this.lightSources[j]
              this.hasLightSource = true;
              return true;
            }
            
        }
      }
    
    this.lightSource = [-1, 1];
    this.hasLightSource = false;
    return false;
  }
  
  hasItem(id)
  {
    let inv = this.inventory;
    
    for(let i = 0; i < inv.length; i++)
      {
        if(inv[i][0] == id)
          return [true, i]
      }
    
    return [false];
  }
  
  shootWithBow()
  {
    if(this.inventory[this.selectedInventoryItem] && this.inventory[this.selectedInventoryItem][0] == 46)
      {
        let hasArrows = this.hasItem(47);
        
        if(hasArrows[0])
          {
            this.removeFromInventory(hasArrows[1], 1);
            this.projectiles.push(new Projectile(this.pos[0] + this.size[0], this.pos[1] + this.size[1] / 2, this.getMouseDir(), -1, 5, 2, blockTextures[47]));
            
            //if(this.pos[0] < mouseX)
            // this.projectiles[this.projectiles.length - 1].speed *= -1;
            
            this.projectiles[this.projectiles.length - 1].setHeading([mouseX, mouseY]);
            this.projectiles[this.projectiles.length - 1].setStartPos([this.pos[0], this.pos[1] + this.size[1] / 2]);
            this.projectiles[this.projectiles.length - 1].attackPlayer(false);
          }
      }
  }
  
  getMouseDir()
  {
    let x1, y1, x2, y2, dir;
    
    x1 = mouseX;
    y1 = mouseY;
    x2 = this.pos[0] + this.size[0] / 2;
    y2 = this.pos[1] + this.size[1] / 2;
    
    dir = createVector(x1 - x2, y2 - y1).normalize();
    
    //print(dir, createVector(x1 - x2, y1 - y2).normalize())
    
    return dir;
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
                      if(chunks[i][j][6] == 0 || chunks[i][j][6] == 1){
                        explosion([bx, by], 5);
                        return [true, i, j, k];
                      }
                    }
                }
            }
        }
      
      return [false];
    }
  
  inCave()
  {
    return this.collidedBlockType == -2;
  }
}

function drawFromLightSource(sx, sy, strength, offset) {
  let blocks = [];
  let bs = 20;
  let size = 300;
  let chunks = terrain.getChunks()
  let toff = terrain.getOffset();
  
  for(let i = -size; i < size; i += bs)
    {
      for(let j = -size; j < size; j += bs)
        {
          x = sx + i;
          y = sy + j;
          
          if(true)
            {
              blocks.push([x, y, bs, bs])
            }
        }
      
    }
  
  /*for(let i = 0; i < chunks.length; i++)
    {
      if(chunks[i][0][0] + toff - sx < 16 * blockSize)
      for(let j = 0; j < chunks[i].length; j++)
        {
          for(let k = 0; k < blocks.length; k++)
            {
              let bx, by, bw, bh, wx, wy, ww, wh;
                  bx = blocks[k][0];
                  by = blocks[k][1];
                  bw = bs;
                  bh = bs;
                  wx = chunks[i][j][0] + toff;
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
                      blocks.splice(k, 1);
                    }
            }
        }
    }
    */
  
  for(let i = 0; i < blocks.length; i++)
    {
      let alpha = 255 - dist(sx, sy, blocks[i][0] + bs / 2 + offset, blocks[i][1] + bs / 2) / strength;
        
      if(alpha > 0){
        noStroke();
        fill(255, (alpha - time / 1.5) / 2);
        rect(blocks[i][0], blocks[i][1], bs, bs);
      }
    }
  
}
