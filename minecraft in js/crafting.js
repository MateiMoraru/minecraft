const CRAFTING_RECEPIES = [[[5, 1], [9, 4]],
                  [[9, 2], [10, 4]],
                  [[9, 4], [11, 1]],
                  [[16, 3], [10, 2], [19, 1]],
                  [[9, 3], [10, 2], [20, 1]],
                  [[10, 1], [17, 1], [12, 1]],
                  [[10, 1], [9, 2], [26, 1]],
                  [[2, 1], [9, 2], [27, 1]],
                  [[16, 1], [9, 2], [28, 1]],
                  [[18, 3], [16, 3], [34, 3], [38, 1]],
                  [[38, 3], [9, 2], [39, 1]],
                  [[42, 1], [33, 5], [41, 1]]];

const PLAYER_CRAFTING_RECEPIES = [[[5, 1], [9, 4]],
                                 [[5, 2], [10, 4]],
                                 [[9, 4], [11, 1]],
                                 [[10, 1], [17, 1], [12, 1]]]

function craft(inventory, hiddenInventory, recepieId) {
  let inv = inventory;

  let matched = 0;
  let neededMatches = CRAFTING_RECEPIES[recepieId].length - 1;
  let invIdx = [];

  for (let j = 0; j < CRAFTING_RECEPIES[recepieId].length - 1; j++) {
    for (let i = 0; i < inv.length; i++) {
      if (
        inv[i][0] == CRAFTING_RECEPIES[recepieId][j][0] &&
        inv[i][1] >= CRAFTING_RECEPIES[recepieId][j][1]
      ) {
        matched += 1;
        invIdx.push(i);
        
        if(matched == neededMatches)
          {
            break;
          }
      }
    }
  }
  
  if (matched == neededMatches) {
    return [CRAFTING_RECEPIES[recepieId][CRAFTING_RECEPIES[recepieId].length - 1][0], CRAFTING_RECEPIES[recepieId][CRAFTING_RECEPIES[recepieId].length - 1][1], invIdx];
  }

  return [-1, -1,-1];
}
