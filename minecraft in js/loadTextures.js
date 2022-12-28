var blockTextures = [];
var skybox;

function loadImages()
{
  blockTextures[0] = loadImage("textures/grass_block.png"); //grass block
  print("loaded the grass block texture");
  blockTextures[1] = loadImage("textures/dirt_block.png"); //dirt block
  print("loaded the dirt block texture");
  blockTextures[2] = loadImage("textures/stone_block.png"); //stone
  print("loaded the stone block texture");
  blockTextures[3] = loadImage("textures/spruce_log.png"); //spruce log
  print("loaded the spruce log texture");
  blockTextures[4] = loadImage("textures/spruce_leaves.png"); //spruce leaves
  print("loaded the spruce leaves texture");
  blockTextures[5] = loadImage("textures/oak_log.png"); //oak log
  print("loaded the oak log texture");
  blockTextures[6] = loadImage("textures/oak_leaves.png"); //oak leaves
  print("loaded the oak leaves texture");
  blockTextures[7] = loadImage("textures/grass.png"); //grass
  print("loaded the grass texture");
  blockTextures[8] = loadImage("textures/rose.png"); //rose
  print("loaded the rose texture");
  blockTextures[9] = loadImage("textures/oak_planks.png"); //oak planks
  print("loaded the oak planks texture");
  blockTextures[10] = loadImage("textures/stick.png"); //stick
  print("loaded the stick texture");
  blockTextures[11] = loadImage("textures/crafting_table.png"); //crafting table
  print("loaded the crafting table texture");
  blockTextures[12] = loadImage("textures/torch.png"); //torch
  print("loaded the torch texture");
  blockTextures[13] = loadImage("textures/water.png");
  print("loaded the water texture");
  blockTextures[14] = loadImage("textures/sand.png");
  print("loaded the sand texture");
  blockTextures[15] = loadImage("textures/iron_ore.png");
  print("loaded the iron ore texture");
  blockTextures[16] = loadImage("textures/iron_ingot.png");
  print("loaded the iron ingot texture");
  blockTextures[17] = loadImage("textures/coal_ore.png"); //coal
  print("loaded the coal ore texture");
  blockTextures[18] = loadImage("textures/coal.png");
  print("loaded the coal texture");
  blockTextures[19] = loadImage("textures/iron_pickaxe.png");
  print("loaded the iron pickaxe texture");
  blockTextures[20] = loadImage("textures/wooden_pickaxe.png");
  print("loaded the wooden pickaxe texture");
  blockTextures[21] = loadImage("textures/stone_pickaxe.png");
  print("loaded the stone pickaxe texture");
  blockTextures[22] = loadImage("textures/chest.png");
  print("loaded the chest texture");
  blockTextures[23] = loadImage("textures/sheep.png");
  print("loaded the sheep texture");
  blockTextures[24] = loadImage("textures/white_wool.png");
  print("loaded the white wool texture");
  blockTextures[25] = loadImage("textures/raw_mutton.png");
  print("loaded the raw mutton texture");
  blockTextures[26] = loadImage("textures/wooden_sword.png");
  print("loaded the wooden sword texture");
  blockTextures[27] = loadImage("textures/stone_sword.png");
  print("loaded the stone sword texture");
  blockTextures[28] = loadImage("textures/iron_sword.png");
  print("loaded the iron sword texture");
  blockTextures[29] = loadImage("textures/heart.png");
  print("loaded the heart texture");
  blockTextures[30] = loadImage("textures/zombie.png");
  print("loaded the zombie texture");
  blockTextures[31] = loadImage("textures/rotten_flesh.png");
  print("loaded the rotten flesh texture");
  blockTextures[32] = loadImage("textures/diamond_ore.png");
  print("loaded the diamond ore texture");
  blockTextures[33] = loadImage("textures/diamond.png");
  print("loaded the diamond texture");
  blockTextures[34] = loadImage("textures/gold_ore.png");
  print("loaded the gold ore texture");
  blockTextures[35] = loadImage("textures/gold_ingot.png");
  print("loaded the gold ingot texture");
  blockTextures[36] = loadImage("textures/lapis_lazuli_ore.png");
  print("loaded the lapis lazuli ore texture");
  blockTextures[37] = loadImage("textures/lapis_lazuli.png");
  print("loaded the lapis lazuli texture");
  blockTextures[38] = loadImage("textures/azamat.png");
  print("loaded the azamat texture");
  blockTextures[39] = loadImage("textures/azamat_pickaxe.png");
  print("loaded the azamat pickaxe texture");
  blockTextures[40] = loadImage("textures/barrier_block.png");
  print("loaded the barrier block texture");
  blockTextures[41] = loadImage("textures/portal_azamat.png");
  print("loaded the azamat portal texture");
  blockTextures[42] = loadImage("textures/portal_lighter.png");
  print("loaded the portal lighter texture");
  blockTextures[43] = loadImage("textures/obsidian_block.png");
  print("loaded the obsidian block texture");
  blockTextures[44] = loadImage("textures/candle.png");
  print("loaded the candle texture");
  blockTextures[45] = loadImage("textures/archer.png");
  print("loaded the archer texture");
  blockTextures[46] = loadImage("textures/bow.png");
  print("loaded the bow texture");
  blockTextures[47] = loadImage("textures/arrow.png");
  print("loaded the arrow texture");
  blockTextures[48] = loadImage("textures/goblin.png");
  print("loaded the goblin texture");
  skybox = loadImage("textures/skybox.png");
  print("loaded the skybox texture");
  azamat_skybox = loadImage("textures/azamat_skyblock.png");
  print("loaded the azamat skybox texture");
  azamat_light = loadImage("textures/azamat_light.png");
  print("loaded the azamat light texture");
  
}