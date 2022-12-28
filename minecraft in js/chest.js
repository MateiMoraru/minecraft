class Chest
  {
    constructor(pos, size, type)
    {
      this.pos = pos;
      this.size = [size, size];
      this.type = type;
      this.items = [];
      this.itemPos = [];
      
      if(type == "Treasure")
        this.randomize();
    }
    
    randomize()
    {
      this.loot = random(3);
      
      let items = [[[42, 1], [38, 5], [33, 9]], [[16, 1], [19, 1], [5, 20]], [[21, 1], [5, 10], [2, 15]], [[20, 1], [1, 5], [2, 5]]];
      if(this.loot > 2.9)
        {
          this.items = items[0]
        }
      if(this.loot > 2.5)
        {
          this.items = items[1];
        }
      else if(this.loot > 1.5)
        {
          this.items = items[2];
        }
      else
        {
          this.items = items[3];
        }
    }
    
    drawItems()
    {
      this.itemPos = [];
      let y = height / 5 + 30;
      let x = width / 5 + 30;
      for (let i = 0; i < this.items.length; i++) {
        if (i % 10 == 0) {
          y += 65;
          x = width / 5 + 30;
        }
        stroke(214, 195, 118);
        //fill(BLOCKCOLORS[this.hiddenInventory[i][0]]);
        //rect(x, y, 30, 30);
        image(blockTextures[this.items[i][0]], x, y);
        this.itemPos.push([x, y, this.size[0], this.size[1], this.items[i][0]])

        fill(0);
        stroke(0);
        textSize(15);
        text(
          this.items[i][1],
          x + 10 - str(this.items[i][1]).length / 1.3,
          y + 20
        );
        
        x += 65
      }
    }
    
    draw()
    {
      fill(0, 200);
      rect(0, 0, width, height);
      
      fill(61, 44, 35);
      rect(width / 5, height / 5, width / 1.75, height / 1.75);
      
      textSize(30);
      fill(0);
      stroke(0);
      text(this.type + " Chest", width / 2 - 100, height / 5 + 25)
      textSize(15);
      
      text("Loot " + this.loot, width / 5, height / 5 + 15);
      
      this.drawItems();
    }
    
    addToInventory()
    {
      if(mouseIsPressed)
        {
          let coll = this.collidedWithItem();
          
          if(coll[0])
            {
              let r = [coll[0], coll[1], this.items[coll[1]]]
          
              this.items[coll[1]][1]--;
          
              if(this.items[coll[1]][1] < 1)
                {
                  this.items.splice(coll[1], 1);
                }
          
              return r;
            }
          return [false];
          
        }
      return [false];
    }
    
    collidedWithItem()
    {
      let collider = [mouseX, mouseY, 5, 5]
      for (let i = 0; i < this.itemPos.length; i++) {
        if (
          true
        ) {
          let bx, by, bw, bh, wx, wy, ww, wh;
          bx = collider[0];
          by = collider[1];
          bw = collider[2];
          bh = collider[3];
          wx = this.itemPos[i][0];
          wy = this.itemPos[i][1];
          ww = this.itemPos[i][2];
          wh = this.itemPos[i][3];

          if (
            ((bx >= wx && bx < wx + ww && by > wy && by < wy + wh) ||
            (bx + bw >= wx && bx + bw < wx + ww && by > wy && by < wy + wh) ||
            (bx + bw >= wx &&
              bx + bw < wx + ww &&
              by + bh >= wy &&
              by + bh < wy + wh) ||
              (bx >= wx && bx < wx + ww && by + bh > wy && by + bh < wy + wh))
            ) {
               return [true, i]; 
            }


          }

          return [false];
        }
      return [false];
  }
    addElements(el)
    {
      this.items = [el];
      print(el)
    }
  }