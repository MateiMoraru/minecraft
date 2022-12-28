class Chat_Box {
  constructor() {
    this.pos = [width - width / 3, height / 2 + height / 7];
    this.size = [width / 3, height - (height / 2 + height / 7)];
    this.fade = 200;
    
    this.isTyping = false;
    
    this.currentMessage = "";
    this.ableToType = true;
    
    this.messages = [];
  }

  draw() {
    if (this.fade > 0) {
      fill(0, this.fade);
      stroke(0, this.fade);
      rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
      
      fill(CHAT_TEXT_COLOR[0], CHAT_TEXT_COLOR[0], CHAT_TEXT_COLOR[0], this.fade * 1.5);
      stroke(0, this.fade * 1.5);
      
      text(this.currentMessage, this.pos[0], this.pos[1] + this.size[1] - 15);
      
      for(let i = this.messages.length - 1; i >= 0; i--)
        {
          text(this.messages[this.messages.length - 1 - i], this.pos[0], this.pos[1] - 30 - i * 20 + this.size[1])
        }
    }
  }

  update() {
    this.fade--;
    
    if(this.messages.length >= 15)
      {
        this.messages.splice(0, 1)
      }
    
    if(keyIsDown(KEYS[6]))
      {
        this.isTyping = true;
      }
    
    if(keyIsDown(KEYS[5]))
      {
        this.isTyping = false;
        this.currentMessage = "";
      }
    
    if(keyIsDown(KEYS[7]))
      {
        let isCommand = false;
        let command = 0;
        let tempC = this.currentMessage.split(' ');
        if(this.currentMessage.length > 0)
          {
            for(let i = 0; i < COMMANDS.length; i++){
              if(tempC.length > 0)
                {
                  if(tempC[0] == COMMANDS[i][0])
                    {
                      isCommand = true;
                      command = i;
                    }
                }
              else if(this.currentMessage == COMMANDS[i][0])
                {
                  isCommand = true;
                  command = i;
                }
            }
            if(!isCommand)
              this.messages.push("<" + USERNAME + "> " + this.currentMessage);
            else
              {
                EXEC_COMMAND(COMMANDS[command][1], this.currentMessage);
              }
            this.currentMessage = "";
          }
      }
    
    if(this.isClicked() || this.isTyping){
      this.isTyping = true;
      this.fade = 150;
      
    }
  }
  
  addToMessage(key)
  {
    if(this.isTyping && key != "Enter" && key != "Escape")
      {
        this.currentMessage += key;
      }
  }
  
  isClicked()
  {
    let bx, by, bw, bh, wx, wy, ww, wh;
    bx = mouseX;
    by = mouseY;
    bw = 5;
    bh = 5;
    wx = this.pos[0];
    wy = this.pos[1];
    ww = this.size[0];
    wh = this.size[1];

    if (
      (bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
      (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
      (bx + bw >= wx && bx + bw < wx + ww && by + bh >= wy && by + bh < wy + wh) ||
      (bx >= wx && bx < wx + ww && by + bh > wy && by + bh < wy + wh)
    ) {
      return true && mouseIsPressed;
    }
    return false;
  }
  
  addMessage(msg, fade)
  {
    this.messages.push(msg);
    
    if(fade)
      this.fade = 150;
  }
}
