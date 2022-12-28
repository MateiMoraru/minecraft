var BLOCKCOLORS = [
  [76, 212, 106], //grass block
  [92, 52, 28], // dirt block
  [83, 93, 94], // stone block
  [28, 12, 3],
  [63, 82, 51],
  [115, 70, 13],
  [75, 181, 42],
  [65, 143, 41],
  [176, 38, 7],
  [212, 171, 99], //planks
  [61, 43, 27], // stick
  [61, 43, 27],
  [61, 43, 27],
  [12, 64, 90],
  [220, 200, 168],
  [83, 93, 94],
  [203, 214, 213],
  [83, 93, 94],
  [46, 48, 48],
  [61, 43, 27],
  [61, 43, 27],
  [61, 43, 27],
  [61, 43, 27],
  [212, 171, 99],
  [200, 200, 200],
  [201, 71, 58], // 25
  [61, 43, 27],
  [83, 93, 94],
  [83, 93, 94],
  [230, 230, 230],
  [60, 200, 60],
  [230, 230, 230],
  [83, 93, 94],
  [83, 93, 94],
  [83, 93, 94],
  [83, 93, 94],
  [83, 93, 94],
  [83, 93, 94],
  [83, 93, 94],
  [83, 93, 94],
  [255, 255, 255],
  [119, 26, 116],
  [211, 81, 42],
  [69, 38, 41],
  [219, 217, 92]
];

class Terrain {
  constructor() {
    this.chunks = [];
    this.blockSize = 30;
    this.chunkSize = 16;
    this.offsetX = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.biome = "hills";
    this.biomes = ["hills", "plains", "cliffs"];
    //this.biome = this.biomes[int(random(-1, this.biomes.length))];
    this.lastTreeX = -100;
    this.ableToPlaceWater = true;
    this.tempWater = [];
    this.chest = [];
    
    this.leafShaders = [0, 0, 30, 30];
    this.shaderDirection = 1;
    
    this.cave = [[-1, -1], [-1, -1]];
    
    this.entities = [];
    this.azamatEntities = [];
    this.clouds = [];
    this.generateTerrain(5);
    
    this.dimension = "overworld";
    this.azamatChunks = [];
    this.azamatLastX = null;
    this.azamatLastY = null;
    this.azamatOffset = 0;
  }
  
  spawnGoblinGang(pos)
  {
    let goblins = int(random(2, 4));
    
    for(let i = 0; i <= goblins; i++)
      {
        //print(i)
        this.entities.push(new Goblin([pos[0] + random(-50, 50), pos[1]]));
        this.entities[this.entities.length - 1].setActive(false);
        this.entities[this.entities.length - 1].setSleeping(true);
      }
  }
  
  generateCloud()
  {
    let x1, x2, y, cloudPos, clouds, length;
    x1 = this.lastX;
    x2 = this.lastX + 16 * this.blockSize;
    
    cloudPos = [random(x1, x2), random(0, this.lastY + 120)];
    length = int(random(2, 6)) * this.blockSize;
    clouds = [];
    
    for(let i = cloudPos[0]; i < cloudPos[0] + length; i += this.blockSize)
      {
        clouds.push([i, cloudPos[1]]);
        if(random(1) > 0.5)
          clouds.push([i, cloudPos[1] - this.blockSize])
      }
    
    this.clouds.push(clouds);
    
  }

  generateTerrain(chunks) {
    for (let i = 0; i < chunks; i++) {
      this.generateCloud();
      if (i == 0)
        this.chunks.push(
          this.generateChunks(0, int(random(8, 25)) * this.blockSize)
        );
      else this.chunks.push(this.generateChunks(this.lastX, this.lastY));
    }
  }

  generateChunks(startX, startY) {
    let blocks = [];
    this.lastX = startX;
    this.lastY = startY;

    if (random(1) > 0.9) {
      let idx = int(random(-1, this.biomes.length));
      this.biome = this.biomes[idx];
    }

    for (
      let x = this.lastX;
      x < this.lastX + this.chunkSize * this.blockSize;
      x += this.blockSize
    ) {
      let map = [];
      
      if(this.lastX + this.chunkSize * this.blockSize - this.blockSize == x)
        {
          this.lastTreeX = x + 100;
        }
      if (this.biome == "hills") {
        map = [-1, 0, 1];

        if (random(1) > 0.8 && x - this.lastTreeX > 4 * this.blockSize) {
          let treeHeight = int(random(5, 7));
          for (let i = 0; i < treeHeight; i++) {
            blocks.push([
              x,
              this.lastY - this.blockSize * i,
              this.blockSize,
              this.blockSize,
              5,
              this.biome,
              1,
            ]);
          }

          blocks.push([
            x,
            this.lastY - this.blockSize * treeHeight,
            this.blockSize,
            this.blockSize,
            6,
            this.biome,
            1,
          ]);
          blocks.push([
            x - this.blockSize,
            this.lastY - this.blockSize * treeHeight,
            this.blockSize,
            this.blockSize,
            6,
            this.biome,
            1,
          ]);
          blocks.push([
            x + this.blockSize,
            this.lastY - this.blockSize * treeHeight,
            this.blockSize,
            this.blockSize,
            6,
            this.biome,
            1,
          ]);
          blocks.push([
            x,
            this.lastY - this.blockSize * treeHeight - this.blockSize,
            this.blockSize,
            this.blockSize,
            6,
            this.biome,
            1,
          ]);

          this.lastTreeX = x;
        }
      } else if (this.biome == "plains") {
        map = [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
        if (random(1) > 0.7) {
          blocks.push([
            x,
            this.lastY - this.blockSize,
            this.blockSize / 5,
            this.blockSize,
            7,
            this.biome,
            0,
          ]);
          
        } else if (random(1) > 0.7) {
          
          blocks.push([
            x + this.blockSize / 2 - this.blockSize / 3.5 / 6,
            this.lastY - this.blockSize,
            this.blockSize / 3.5,
            this.blockSize / 3.5,
            8,
            this.biome,
            0,
          ]);
        }
      } else if (this.biome == "cliffs") {
        map = [-1, -1, -1, -2, 0, 1, 1, 1, 2];

        if (random(1) > 0.8 && x - this.lastTreeX > 4 * this.blockSize) {
          let treeHeight = int(random(5, 12));
          for (let i = 0; i < treeHeight; i++) {
            blocks.push([
              x,
              this.lastY - this.blockSize * i,
              this.blockSize,
              this.blockSize,
              3,
              this.biome,
              1,
            ]);
          }

          blocks.push([
            x,
            this.lastY - this.blockSize * treeHeight,
            this.blockSize,
            this.blockSize,
            4,
            this.biome,
            1,
          ]);
          blocks.push([
            x - this.blockSize,
            this.lastY - this.blockSize * treeHeight,
            this.blockSize,
            this.blockSize,
            4,
            this.biome,
            1,
          ]);
          blocks.push([
            x + this.blockSize,
            this.lastY - this.blockSize * treeHeight,
            this.blockSize,
            this.blockSize,
            4,
            this.biome,
            1,
          ]);
          blocks.push([
            x,
            this.lastY - this.blockSize * treeHeight - this.blockSize,
            this.blockSize,
            this.blockSize,
            4,
            this.biome,
            1,
          ]);

          this.lastTreeX = x;
        }
      } else {
        map = [0, 0, 0];
      }
      
      if(random(1) > 0.4 && this.lastY < height / 2 && x - this.lastTreeX > 0)
        {
          this.entities.push(new Sheep([x, this.lastY - this.blockSize]));
        }

      if(this.lastY > height / 2)
      {
        this.lastTreeX = x;
        for(let i = this.lastY; i > height / 2 - 30; i -= this.blockSize)
          {
            blocks.push([x, i, this.blockSize, this.blockSize, 13, this.biome, -1]);
          }
      	
        blocks.push([
        x,
        this.lastY,
        this.blockSize,
        this.blockSize,
        14,
        this.biome,
        1,
      ]);
        blocks.push([
        x,
        this.lastY + this.blockSize,
        this.blockSize,
        this.blockSize,
        14,
        this.biome,
        1,
      ]);
      }
      else
        {

          blocks.push([
            x,
            this.lastY,
            this.blockSize,
            this.blockSize,
            0,
            this.biome,
            1,
          ]);
          blocks.push([
            x,
            this.lastY + this.blockSize,
            this.blockSize,
            this.blockSize,
            1,
            this.biome,
            1,
          ]);
        }
      
      if(random(1) > 0.2 && this.lastTreeX - x >= this.blockSize)
        {
          blocks.push([x, this.lastY - this.blockSize, this.blockSize, this.blockSize, 22, this.biome, 0, this.chest.length]);
          
          this.chest.push(new Chest([x, this.lastY], this.blockSize, "Treasure"));
        }

      for (
        let y = this.lastY + this.blockSize * 2;
        y < height;
        y += this.blockSize
      ) {
        if(y > this.cave[1][1] || y < this.cave[0][1]){
          if(random(1) > 0.93)
            {
              blocks.push([x, y, this.blockSize, this.blockSize, 17, this.biome, 1])
            }
          else if(random(1) > 0.95)
            {
              blocks.push([x, y, this.blockSize, this.blockSize, 15, this.biome, 1])
            }
          else if(random(1) > 0.97)
            {
              blocks.push([x, y, this.blockSize, this.blockSize, 36, this.biome, 1])
            }
          else if(random(1) > 0.98)
            {
              blocks.push([x, y, this.blockSize, this.blockSize, 34, this.biome, 1])
            }
          else if(random(1) > 0.995 && y > height / 1.5)
            {
              blocks.push([x, y, this.blockSize, this.blockSize, 32, this.biome, 1])
            }
          else
            {
              blocks.push([x, y, this.blockSize, this.blockSize, 2, this.biome, 1]);
            }
        }
        else
          {
            blocks.push([x, y, this.blockSize, this.blockSize, 2, this.biome, -2]);
            
            if(random(1) > 0.9 && this.cave[0][1] + 40 < y && abs(this.cave[0][1] - this.cave[1][1]) > this.blockSize * 3)
              this.spawnGoblinGang([x, y]);
            
          }
        
        
        if(this.cave[0][1] == -1)
          {
            if(random(1) > 0.99)
              {
                //print("new cave at x", x)
                this.cave[0][1] = y;
                //this.cave[0][0] = x;
                
                this.cave[1][1] = y + int(random(4, 5)) * this.blockSize;
                //this.cave[1][0] = x;
                
                
              }
          }
      }
      
      if(this.cave[0][1] != -1)
          {
            if(random(1) > 0.0)
              {
                let r = int(random(-2, 2)) * this.blockSize;
                this.cave[0][1] += r;

                this.cave[1][1] += r;

                if(this.cave[0][1] > height - 120 || this.cave[1][1] > height - 120)
                  {
                    this.cave[0][1] += -this.blockSize * 2
                    this.cave[1][1] += -this.blockSize * 2
                  }

                if(this.cave[0][1] < this.lastY + 240 || this.cave[1][1] < this.lastY + 240)
                  {
                    this.cave[0][1] += this.blockSize * 2
                     this.cave[1][1] += this.blockSize * 2
                  }
                
                if(abs(this.cave[1][1] - this.cave[0][1]) > 5 * this.blockSize)
                  {
                    this.cave[1][1] += this.blockSize
                  }
                if(random(1) > 0.99)
                  {
                    this.cave = [[-1, -1], [-1, -1]]
                  }  
              }  
          }

      blocks.push([x, height, this.blockSize, this.blockSize, 40, this.biome, 1]);
      this.lastY += map[int(random(-1, map.length))] * this.blockSize;

      if (this.lastY < 8 * this.blockSize) {
        this.lastY += 2 * this.blockSize;
      } else if (this.lastY > height - 2 * this.blockSize) {
        this.lastY -= 2 * this.blockSize;
      }
    }

    this.lastX = this.lastX + this.chunkSize * this.blockSize;

    return blocks;
  }

  draw() {
    
    push();
    
    translate(this.offsetX / 2, 0);
    
    stroke(255, 200);
    fill(255, 200);
    
    for(let i = 0; i < this.clouds.length; i++)
      {
        
        if(this.clouds[i][0][0] + (this.offsetX / 2) > -this.clouds[i].length * this.blockSize && this.clouds[i][0][0] + (this.offsetX / 2) < width + this.blockSize)
        
        for(let j = 0; j < this.clouds[i].length; j++)
            rect(this.clouds[i][j][0], this.clouds[i][j][1], this.blockSize, this.blockSize);
          
      }
    
    pop();
    
    push();
    translate(this.offsetX, 0);
    let textChunk = false;

    for (let i = 0; i < this.chunks.length; i++) {
      for (let j = 0; j < this.chunks[i].length; j++) {
        let currentChunk = this.chunks[i][j];
        let x, y, w, h;
        x = currentChunk[0];
        y = currentChunk[1];
        w = currentChunk[2];
        h = currentChunk[3];

        if (
          x + this.offsetX < width + 30 &&
          x + this.offsetX > -this.chunkSize * this.blockSize
        ) {
          this.updateShaders()
          
          //let alpha = 255 - dist(player.pos[0] + player.size[0] / 2, player.pos[1] + player.size[1], this.chunks[i][j][0] + this.blockSize / 2 + this.offsetX, this.chunks[i][j][1] + this.blockSize / 2) / player.lightSource[1] * 1.1;
          
          if(currentChunk[4] == 4 || currentChunk[4] == 6 || currentChunk[4] == 7 || currentChunk[4] == 8)
            {
              image(blockTextures[currentChunk[4]], x - this.leafShaders[0], y - this.leafShaders[1], this.leafShaders[2], this.leafShaders[3]);
            }
          else if(currentChunk[6] == -2){
            
            image(blockTextures[currentChunk[4]], x, y);
            fill(0, 150);
            stroke(0, 0)
            rect(x, y, 32, 32)
            fill(0, 0)
          }
          else
            image(blockTextures[currentChunk[4]], x, y);
          
          //if(alpha > 0)
          //{
            //noStroke();
            //fill(255, alpha - 100 + time / 2); 
            //rect(this.chunks[i][j][0], this.chunks[i][j][1], 32, 32);  
          //}
          
          
          if(currentChunk[4] == 12)
            {
              drawFromLightSource(x, y, 5, 5);
            }

          if (
            x + this.offsetX > width / 2 - 15 &&
            x + this.offsetX < width / 2 + 15 &&
            !textChunk
          ) {
            //stroke(0);
            //fill(0);
            //text("Chunk: " + currentChunk[5], -this.offsetX, 30);
            //textChunk = true;
          }
        } else {
          break;
        }
      }
    }
    pop();
    
    let idx = 0;
    for(let i = 0; i < this.entities.length; i++)
      {
        if(this.entities[idx].inBoundries()){
          if(this.entities[idx].id == "goblin"){
             //print(this.entities[idx].id, player.inCave())
              if(player.inCave()){
                this.entities[idx].draw();
               
              }
          }
          else if(this.entities[idx].id != "goblin")
            this.entities[idx].draw();
          this.entities[idx].update(this.getChunks(), this.getOffset());
        }
        
        if(this.entities[idx].id == "zombie")
          {
            this.entities[idx].updatePlayerPos(player.pos);
          }
        
        if(this.entities[idx].id == "goblin")
          {
            this.entities[idx].updatePlayerPos(player.pos);
          }
        
        if(!this.entities[idx].isAlive())
          {
            sounds[7].play();
            this.entities.splice(idx, 1);
            idx--;
          }
        
        idx++;
      }
  }

  update() {
    this.speed = 0;
    
    this.spawnZombie();
    this.spawnArcher();
    
    if(!chat_box.isTyping)
      {
        if (keyIsDown(MOVEMENT_CONTROLS[2])) {
          this.speed -= 3;
        }

        if (keyIsDown(MOVEMENT_CONTROLS[0])) {
          this.speed += 3;
        }

        if (keyIsDown(MOVEMENT_CONTROLS[3])) {
          this.speed *= 2;
        }
      }
    if(dimension == "overworld")
      {
        this.offsetX += this.speed;

        if (this.offsetX > 0) {
          this.offsetX -= this.speed;
        }

        if (this.lastX + this.offsetX < width + 32 * 30) {
          this.chunks.push(this.generateChunks(this.lastX, this.lastY));
        }
      }
    else if(dimension == "azamat")
      {
        this.azamatOffset += this.speed;

        if (this.azamatOffset > 0) {
          this.azamatOffset -= this.speed;
        }

        if (this.azamatLastX + this.azamatOffset < width + 32 * 30) {
          this.azamatChunks.push(this.generateAzamatChunk(this.azamatLastX, this.azamatLastY));
        }
      }
  }
  
  updateShaders()
  {
    this.leafShaders[0] += 0.00001 * this.shaderDirection;
    this.leafShaders[1] += 0.00001 * this.shaderDirection;
    this.leafShaders[2] += 0.00002 * this.shaderDirection;
    this.leafShaders[3] += 0.00002 * this.shaderDirection;
  
    //print(this.leafShaders)
    
    if(this.leafShaders[0] > 2)
      {
        //this.leafShaders = [0, 0, 30, 30];
        this.shaderDirection = -1;
      }
    
    if(this.leafShaders[0] <= 0)
      {
        this.shaderDirection = 1; 
      }
  }

  breakBlock(i, j) {
    if(dimension == "overworld")
      this.chunks[i].splice(j, 1);
    else if(dimension == "azamat")
      this.azamatChunks[i].splice(j, 1)
  }

  placeBlock(i, block) {
    //print(i, block)
    if(dimension == "overworld")
      this.chunks[i].push(block);
    else if(dimension == "azamat")
      this.azamatChunks[i].push(block)
  }

  changeOffset(n) {
    if(dimension == "overworld")
      this.offsetX += n;
    else if(dimension == "azamat")
      this.azamatOffset += n;
  }

  getChunks() {
    if(dimension == "overworld")
      return this.chunks;
    else if(dimension == "azamat")
      return this.azamatChunks;
  }

  getOffset() {
    if(dimension == "overworld")
      return this.offsetX;
    else if(dimension == "azamat")
      return this.azamatOffset;
  }
  
  getChests()
  {
    return this.chest;
  }

  getEntities()
  {
    if(dimension == "overworld")
      return this.entities;
    else if(dimension == "azamat")
      return this.azamatEntities;
  }
  
  checkEntityDeath()
  {
    if(dimension == "overworld")
      for(let i = 0; i < this.entities.length; i++)
        {
          if(!this.entities[i].isAlive())
            {
              sounds[7].play()
              return [true, i];
            }
        }
    else if(dimension == "azamat")
      {
        for(let i = 0; i < this.azamatEntities.length; i++)
        {
          if(!this.azamatEntities[i].isAlive())
            {
              sounds[7].play();
              return [true, i];
            }
        }
      }
    
    return [false];
  }
  
  spawnZombie()
  {
    if(time > 150 && random(1) > 0.99 && dimension == "overworld")
      {
        this.entities.push(new Zombie([int(random(0, width)), 60]))
      }
  }
  
  spawnArcher()
  {
    player.checkIfPlayerHasALightSource();
    if(random(1) > 0.9 + player.lightSource[1] / 40 && dimension == "azamat")
      {
        this.azamatEntities.push(new Archer([int(random(0, width)), 60]))
      }
  }
   
  addChest(elements, chunk, pos)
  {
    this.chunks[chunk].push([pos[0], pos[1], this.blockSize, this.blockSize, 22, "chest", 0, this.chest.length]);
    
    this.chest.push(new Chest([pos[0], pos[1]], this.blockSize, "PlayerInventory"))
    this.chest[this.chest.length - 1].addElements(elements);
    
        
  }
  
  killEntities()
  {
    this.entities = [];
    this.azamatEntities = [];
  }
  
  generateAzamatDimension(chunks)
  {
    this.azamatLastX = 0;
    this.azamatLastY = int(random(7, 15)) * this.blockSize
    
    for(let i = 0; i < chunks; i++)
      {
        this.azamatChunks.push(this.generateAzamatChunk())
      }
  }
  
  generateAzamatChunk()
  {
    let blocks = [];
    for(let x = this.azamatLastX; x < 16 * this.blockSize + this.azamatLastX; x += this.blockSize)
      {
        blocks.push([x, this.azamatLastY, this.blockSize, this.blockSize, 43, "azamat", 1]);
        
        for(let y = this.azamatLastY; y < height; y += this.blockSize)
          {
            blocks.push([x, y, this.blockSize, this.blockSize, 43, "azamat", 1]);
          }
        
        this.azamatLastY += int(random(-2, 2)) * this.blockSize;
        
        if(this.azamatLastY < 5 * this.blockSize)
          this.azamatLastY += this.blockSize;
        else if(this.azamatLastY > height - 5 * this.blockSize)
          this.azamatLastY -= this.blockSize;
      }
    this.azamatLastX += 16 * this.blockSize;
    
    return blocks;
  }
  
  drawAzamat()
  {
    let alpha = null;
    stroke(0, 0);
    player.checkIfPlayerHasALightSource();
    push();
    
    translate(this.azamatOffset, 0);
    
    for(let i = 0; i < this.azamatChunks.length; i++)
      {
        if(this.azamatChunks[i][0][0] + this.azamatOffset > -16 * this.blockSize && this.azamatChunks[i][0][0] + this.azamatOffset < width)
        for(let j = 0; j < this.azamatChunks[i].length; j++)
          {
            if(player.lightSource[0] != 44)
              {
                alpha = dist(player.pos[0] + player.size[0] / 2, player.pos[1] + player.size[1], this.azamatChunks[i][j][0] + this.blockSize / 2 + this.azamatOffset, this.azamatChunks[i][j][1] + this.blockSize / 2) / player.lightSource[1];
                
                if(alpha < 255)
                  {
                    image(blockTextures[this.azamatChunks[i][j][4]], this.azamatChunks[i][j][0], this.azamatChunks[i][j][1]);
                  }

                fill(0, alpha);
                rect(this.azamatChunks[i][j][0], this.azamatChunks[i][j][1], this.blockSize, this.blockSize);
              }
            else
              {
              image(blockTextures[this.azamatChunks[i][j][4]], this.azamatChunks[i][j][0], this.azamatChunks[i][j][1]);
                
              }
          }
      }
    
    pop();
    
    let idx = 0;
    
    for(let i = 0; i < this.azamatEntities.length; i++)
      {
        if(this.azamatEntities[idx].inBoundries()){
          
          let alpha = dist(player.pos[0] + player.size[0] / 2, player.pos[1] + player.size[1], this.azamatEntities[i].pos[0] + this.blockSize / 2 + this.azamatEntities[idx].offset, this.azamatEntities[i].pos[1] + this.blockSize / 2) / player.lightSource[1];
          
          if(alpha < 255)
            this.azamatEntities[idx].draw();
          this.azamatEntities[idx].update(this.getChunks(), this.getOffset());
        }
        
        if(this.azamatEntities[idx].id == "archer")
          {
            this.azamatEntities[idx].updatePlayerPos(player.pos);
          }
        
        if(!this.azamatEntities[idx].isAlive())
          {
            sounds[7].play();
            this.azamatEntities.splice(idx, 1);
            idx--;
          }
        
        idx++;
      }
    
    
  }
  
}
