document.addEventListener("contextmenu", (event) => event.preventDefault());

var terrain;
var player;
var time = 100;
var timeDirection = 1;
var inMainMenu = true;
var inOptionsMenu = false;
var mainMenu;
var optionsMenu;
var blockSize = 30;
var chat_box;
var dimension = "overworld";
var timesInAzamat = 0;
var achievements;

function setup() {
  createCanvas(1600, 900);
  frameRate(60)
  angleMode(DEGREES);

  loadImages();
  loadSounds();

  terrain = new Terrain();
  player = new Player();

  mainMenu = new MainMenu();
  optionsMenu = new OptionsMenu();
  
  chat_box = new Chat_Box();
  
  achievements = new Achievements();
}

function draw() {
  if (!inMainMenu && !inOptionsMenu) {
    if(dimension == "overworld")
      image(skybox, 0, 0);
    else if(dimension == "azamat")
      image(azamat_skybox, 0, 0);

    if (!player.openedInventory && !player.openedCraftingTable) {
      terrain.update();
    }

    
    if(dimension == "overworld")
      terrain.draw();
    else if(dimension == "azamat")
      {
        terrain.drawAzamat();
        //image(azamat_light, 0, 0)
      }
    player.draw();
    if (!player.openedInventory && !player.openedCraftingTable && !chat_box.isTyping) {
      player.update(terrain);
      breakBlock = player.getCollidedMouse();

      terrain.changeOffset(player.changedOffset);

      if (breakBlock[0]) {
        terrain.breakBlock(breakBlock[1], breakBlock[2]);
      }
      player.drawHealthHearts();
    }
    
    
    chat_box.draw();
    chat_box.update();
    
    achievements.draw();
    achievements.update();

    background(0, time);
    time += 0.01 * timeDirection;
    drawFromLightSource(player.pos[0] + player.size[0] / 2, player.pos[1] + player.size[1] / 2, 0.5, 0)

    if (time > 245) {
      timeDirection *= -1;
    }
    if (time < 0) {
      timeDirection *= -1;
    }
  } else if (inMainMenu) {
    mainMenu.draw();
  } else if (inOptionsMenu) {
    optionsMenu.draw();
  }

  stroke(0);
  fill(0);
  textSize(15);
  text("FPS: " + int(getFrameRate()), 0, 15);
  text("Dimension: " + this.dimension, 0, 45)
}

function keyPressed() {
  if (!inMainMenu && !inOptionsMenu) {
    player.keyPress(key);
  } 

  if (keyCode == KEYS[5] && !chat_box.isTyping) {
    inMainMenu = !inMainMenu;

    if (inOptionsMenu) {
      inOptionsMenu = false;
    }
  }
  
  chat_box.addToMessage(key);
}

function mousePressed() {
  if (!inMainMenu && !inOptionsMenu) {
    if (mouseButton == MOUSE_SETTINGS[1]) {
      eat = player.eat();
      
      if(eat)
        sounds[4].play();
      portal = false;

      if (!eat) {
        portal = player.usePortal();
        
        if(portal)
          {
            dimension = "azamat";
            timesInAzamat++;
            
            if(timesInAzamat == 1)
              {
                terrain.generateAzamatDimension(10);
              }
            
            terrain.changeOffset(int((-terrain.getChunks()[2][0][0] / 2 - 140) / 30) * 30 + 30)
            player.pos[1] = 0
            
              
          }
      }
      
      if(!eat && !portal)
        {
          placeBlock = player.placeBlock(
          terrain.getChunks(),
          terrain.getOffset()
        );
        if (!placeBlock[0]) {
          terrain.placeBlock(placeBlock[1], placeBlock[2]);
          return;
        }
      }
    }
    if (mouseButton == MOUSE_SETTINGS[0]) {
      player.attack(terrain.getEntities());
      
      player.shootWithBow();

      let drop = terrain.checkEntityDeath();

      if (drop[0]) {
        let dropItems = terrain.getEntities()[drop[1]].dropUponDeath();

        for (let i = 0; i < dropItems.length; i++)
          player.addBlockToInventory(dropItems[i][0], dropItems[i][1]);
      }
    }
  }
}

function generateNewWorld() {
  time = 0;
  timeDirection = 1;
  inMainMenu = true;
  inOptionsMenu = false;
  blockSize = 30;
  terrain = new Terrain();
  player = new Player();

  mainMenu = new MainMenu();
  optionsMenu = new OptionsMenu();
}

function collide(tobj1, tobj2, offset)
{
  let obj1, obj2;
  if(!offset)
    offset = 0;
  
  if(tobj1.length < tobj2.length)
    {
      obj1 = tobj2;
      obj2 = tobj1;
    }
  else
    {
      obj1 = tobj1;
      obj2 = tobj2;
    }
  
  for(let i = 0; i < obj1.length; i++)
    {
      for(let j = 0; j < obj2.length; j++)
        {
          let bx, by, bw, bh, wx, wy, ww, wh;
          bx = obj1[i][0] + offset;
          by = obj1[i][1];
          bw = obj1[i][2];
          bh = obj1[i][3];
          wx = obj2[j][0];
          wy = obj2[j][1];
          ww = obj2[j][2];
          wh = obj2[j][3];

          if (
            (bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
            (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
            (bx + bw >= wx &&
              bx + bw < wx + ww &&
              by + bh >= wy &&
              by + bh < wy + wh) ||
            (bx >= wx && bx < wx + ww && by + bh > wy && by + bh < wy + wh)
          ) 
          {
            return true;
          }
        }
    }
  return false;
}

function explosion(impact, radius)
{
  sounds[5].play();
  
  chunks = terrain.getChunks();
  
  for(let i = 0; i < chunks.length; i++)
    {
      if(chunks[i][0][0] - impact[0] < 16 * blockSize)
      for(let j = 0; j < chunks[i].length; j++)
        {
          x1 = chunks[i][j][0] + terrain.getOffset();
          y1 = chunks[i][j][1];
          x2 = impact[0];
          y2 = impact[1];
          
          
          if(dist(x1, y1, x2, y2) <= radius * blockSize && (chunks[i][j][6] == 0 || chunks[i][j][6] == 1))
            {
              terrain.breakBlock(i, j);
            }
        }
    }
  
  let entities = terrain.getEntities();
  
  for(let i = 0; i < entities.length; i++)
    {
      
          x1 = entities[i].pos[0] + entities[i].offset;
          y1 = entities[i].pos[1];
          x2 = impact[0];
          y2 = impact[1];
          
          
          if(dist(x1, y1, x2, y2) <= radius * blockSize)
            {
              terrain.getEntities()[i].hp = -1;
              
              let dropItems = entities[i].dropUponDeath();
              
              for (let i = 0; i < dropItems.length; i++)
                player.addBlockToInventory(dropItems[i][0], dropItems[i][1]);
              
            }
        
    }
}

function setImageAlpha(img, c1)
{
  img.loadPixels();
  
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      
      let c = img.get(x, y);

      let outputColor = color(red(c), green(c), blue(c), c1);
    
      img.set(x, y, outputColor);
    }
  }
  img.updatePixels();
}

