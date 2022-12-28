class CraftingTable
  {
    constructor()
    {
      
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
      text("Crafting Table", width / 2 - 100, height / 5 + 25)
      textSize(15);
    }
    
    update()
    {
      let x = width / 5 + 50
      let y = height / 5 + 50
      for(let i = 0; i < CRAFTING_RECEPIES.length; i++)
        {
          image(blockTextures[CRAFTING_RECEPIES[i][CRAFTING_RECEPIES[i].length - 1][0]], x, y);

          if (
            player.collideBlock(
              [mouseX, mouseY, 5, 5],
              [width / 5 + 50, height / 5 + 50 * (i + 1), 30, 30]
            )
          ) {
            let c = craft(player.inventory, player.hiddenInventory, i);

            if (c[0] >= 0 && mouseIsPressed && mouseButton == LEFT) {
              player.addBlockToInventory(c[0], c[1]);
              player.removeBlockFromInventory(c[2]);
            }
          }
          
          y += 50;
          if(y > height / 5 + height / 1.75 - 50){
            
            y = height / 5 + 50;
            x += 50;
          }
          
        }
    }
  }