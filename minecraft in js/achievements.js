class Achievements {
  constructor() {
    this.unlockedAchievements = ["Hello World!"];
    this.allAchievements = ["Morning Wood!", "Survival Guide!"];
    this.lastAchievement = "Hello World!";
    this.image = loadImage("textures/grass_block.png");
    this.fadeAchievement = 150;
  }
  
  update()
  {
    this.fadeAchievement--;
    
    if(player.hasItem(5)[0])
      {
        let string = "Morning Wood!"
        if(this.allAchievements.includes(string))
          {
            this.unlockedAchievements.push(string);
            this.image = loadImage("textures/oak_log.png");
            this.lastAchievement = string;
            this.fadeAchievement = 150;
            this.allAchievements.splice(this.allAchievements.indexOf(string), 1)
          }
      }
    
    if(player.hasItem(11)[0])
      {
        let string = "Survival Guide!"
        if(this.allAchievements.includes(string))
          {
            this.unlockedAchievements.push(string);
            this.image = loadImage("textures/crafting_table.png");
            this.lastAchievement = string;
            this.fadeAchievement = 150;
            this.allAchievements.splice(this.allAchievements.indexOf(string), 1)
          }
      }
  }
  
  draw()
  {
    if(this.fadeAchievement == 150)
      sounds[0].play();
    if(this.fadeAchievement > -100)
      {
        stroke(50, this.fadeAchievement + 100)
        fill(100, this.fadeAchievement + 100);
        rect(width / 2 - 200, 0, 400, 70);
        
        push()
        
        textSize(20)
        
        translate(width / 2 - 120, 35)
        
        fill(0, this.fadeAchievement + 100)
        text(this.lastAchievement, 0, 0)
        
        let img = this.image
        
        if(this.fadeAchievement % 10 == 0)
          setImageAlpha(img, this.fadeAchievement + 100)
        
        image(img, -55, -20)
        
        //setImageAlpha(this.image, 255)
        
        pop()
      }
  }
}
