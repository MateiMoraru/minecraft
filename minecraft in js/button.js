class Button {
  constructor(pos, size, color, color2, displayText, textSize, textColor) {
    this.pos = pos;
    this.size = size;
    this.color1 = color;
    this.color2 = color2;
    this.currentColor = this.color1;
    this.text = displayText;
    this.collided = false;
    this.textSize = textSize;
    this.textColor = textColor;
    let t = displayText.split(': ')
    
    for(let i = 0; i < KEYCODES.length; i++)
      {
        if(t[1] == KEYCODES[i][0])
          {
            this.text = t[0] + ": " + KEYCODES[i][1];
            
          }
      }
  }

  draw() {
    fill(this.currentColor);
    //print(this.pos, this.size)
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    
    stroke(this.textColor);
    fill(this.textColor);
    textSize(this.textSize);
    text(this.text, this.pos[0] + this.size[0] / 2 - this.text.length * this.textSize / 3.4, this.pos[1] + this.size[1] / 2 + this.textSize / 2.5)
  }

  checkCollision() {
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
      this.currentColor = this.color2;
      this.collided = true;
      return true;
    }
    this.currentColor = this.color1;
    this.collided = false;
    return false;
  }
  
  clicked()
  {
    return this.collided && mouseIsPressed;
  }
  
  setText(at)
  {
    this.text = at;
    let t = at.split(': ')
    for(let i = 0; i < KEYCODES.length; i++)
      {
        if(t[1] == KEYCODES[i][0])
          {
            this.text = t[0] + ": " + KEYCODES[i][1];
            
          }
      }

  }
}
