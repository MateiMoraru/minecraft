//VERSION
const VERSION = 0.15;

//KEYCODES

const KEYCODES = [[65, "A"], [32, "SPACE"], [68, "D"], [37, "LRR"], [39, "RRR"], [81, "Q"], [67, "C"], [69, "E"], [87, "W"],[82, "R"], [84, "T"], [89, "Y"], [85, "U"], [73, "I"], [79, "O"],[80, "P"], [83, "S"], [70, "F"], [71, "G"], [72, "H"], [74, "J"], [75, "K"], [76, "L"], [90, "Z"], [88, "X"], [86, "V"], [66, "B"], [78, "N"], [77, "M"], [16, "SHIFT"], [32, "ESC"]];

const NUMBERS = [[49, "1"], [50, "2"], [51, "3"], [52, "4"], [53, "5"]];

//KEYBINDS

var MOVEMENT_CONTROLS = [65, 32, 68, 16];

var MOUSE_SETTINGS = ['left', 'right'];

var KEYS = [37, 39, 81, 67, 69, 27, 84, 13]

//CHAT TEXT COLOR

var CHAT_TEXT_COLOR = [255, 255, 255];

//MENU

class OptionsMenu
  {
    constructor()
    {
      this.buttons = [];
      this.init();
    }
    
    init()
    {
      let x = width / 3, y = height / 3 - 200;
      this.buttons.push(new Button([x, y], [200 , 50], color(95, 95, 95), color(60, 60, 60), "LEFT: " + MOVEMENT_CONTROLS[0], 20, color(0)));
      y += 100
      
      this.buttons.push(new Button([x, y], [200 , 50], color(95, 95, 95), color(60, 60, 60), "RIGHT: " + MOVEMENT_CONTROLS[2], 20, color(0)));
      y += 100
      
      this.buttons.push(new Button([x, y], [200, 50], color(95, 95, 95), color(60, 60, 60), "JUMP: " + MOVEMENT_CONTROLS[1], 20, color(0)));
      y += 100
      
      this.buttons.push(new Button([x, y], [200, 50], color(95, 95, 95), color(60, 60, 60), "INVENTORY: " + KEYS[4], 20, color(0)));
      
      y += 100
      
      this.buttons.push(new Button([x, y], [200, 50], color(95, 95, 95), color(60, 60, 60), "OPEN CHEST: " + KEYS[3], 20, color(0)));
      y -= 400;
      x += 250;
      
      this.buttons.push(new Button([x, y], [300 , 50], color(95, 95, 95), color(60, 60, 60), "BREAK BLOCK: " + MOUSE_SETTINGS[0], 20, color(0)));
      y += 100;
      
      this.buttons.push(new Button([x, y], [300 , 50], color(95, 95, 95), color(60, 60, 60), "PLACE BLOCK: " + MOUSE_SETTINGS[1], 20, color(0)));
      y += 100;
      
      this.buttons.push(new Button([x, y], [300 , 50], color(95, 95, 95), color(60, 60, 60), "NEXT INVENTORY ITEM: " + KEYS[1], 20, color(0)));
      y += 100;
      
      this.buttons.push(new Button([x, y], [300 , 50], color(95, 95, 95), color(60, 60, 60), "LAST INVENTORY ITEM: " + KEYS[0], 20, color(0)));
      y += 100
      
      this.buttons.push(new Button([x, y], [300, 50], color(95, 95, 95), color(60, 60, 60), "OPEN CRAFTING TABLE: " + KEYS[2], 20, color(0)));
      
      x = width / 2 - 200;
      y = height / 3 + 300
      
      this.buttons.push(new Button([x, y], [400, 50], color(95, 95, 95), color(60, 60, 60), "VISUAL SETTINGS", 30, color(0)))
    }
    
    draw()
  {
    for(let i = 0; i < width; i += 32)
      {
        for(let j = 0; j < height; j += 32)
          {
            image(blockTextures[1], i, j);
          }
      }
    fill(0, 100)
    rect(0, 0, width, height)
    for(let i = 0; i < this.buttons.length; i++)
      {
        this.buttons[i].draw();
        this.buttons[i].checkCollision();
        
        if(this.buttons[i].clicked() && keyIsPressed)
          {
            
            if(i == 0)
              {
                MOVEMENT_CONTROLS[0] = keyCode;
                this.buttons[i].setText("LEFT: " + MOVEMENT_CONTROLS[0])
              }
            if(i == 1)
              {
                MOVEMENT_CONTROLS[2] = keyCode;
                this.buttons[i].setText("RIGHT: " + MOVEMENT_CONTROLS[2])
              }
            if(i == 2)
              {
                MOVEMENT_CONTROLS[1] = keyCode;
                this.buttons[i].setText("JUMP: " + MOVEMENT_CONTROLS[1])
              }
            if(i == 3)
              {
                KEYS[4] = keyCode;
                this.buttons[i].setText("INVENTORY: " + KEYS[4])
              }
            if(i == 4)
              {
                KEYS[3] = keyCode;
                this.buttons[i].setText("OPEN CHEST: " + KEYS[3])
              }
            if(i == 7)
              {
                KEYS[1] = keyCode;
                this.buttons[i].setText("NEXT INVENTORY ITEM: " + KEYS[1])
              }
            if(i == 8)
              {
                KEYS[0] = keyCode;
                this.buttons[i].setText("LAST INVENTORY ITEM: " + KEYS[0])
              }
            if(i == 9)
              {
                KEYS[2] = keyCode;
                this.buttons[i].setText("OPEN CRAFTING TABLE: " + KEYS[2])
              }
            if(i == 10)
              {
                MOVEMENT_CONTROLS[0] = keyCode;
                this.buttons[i].setText("LEFT: " + MOVEMENT_CONTROLS[0])
              }
          }
      }
  }
    
  }