class MainMenu
{
  constructor()
  {
    this.buttons = [];
    this.init();
  }
  
  init()
  {
    this.buttons.push(new Button([width / 3, height / 3], [width / 3 , 50], color(95, 95, 95), color(60, 60, 60), "start", 30, color(0)));
    
    this.buttons.push(new Button([width / 3, height / 3 + 100], [width / 3 , 50], color(95, 95, 95), color(60, 60, 60), "options", 30, color(0)));
    this.buttons.push(new Button([width / 3, height / 3 + 200], [width / 3 , 50], color(95, 95, 95), color(60, 60, 60), "new world", 30, color(0)));
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
        
        if(this.buttons[i].clicked())
          {
            if(i == 0)
              {
                inMainMenu = false;
              }
            if(i == 1)
              {
                inMainMenu = false;
                inOptionsMenu = true;
              }
            if(i == 2)
              {
                generateNewWorld();
              }
          }
      }
    
    textSize(20)
    text("version: " + VERSION + "v", width - 120, height - 5)
  }
}