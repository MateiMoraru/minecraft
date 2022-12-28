const COMMANDS = [["/pos", 0], ["/tp", 1]]

function EXEC_COMMAND(n, command)
{
  switch(n)
    {
      case 0:
        print("Player position {X: " + int(player.pos[0]) + ", Y:" + int(player.pos[1]) + "}");
        break;
      case 1:
        let com = command.split(" ");
        print(com)
        
        if(com.length >= 3){
          if(Number.isInteger(int(com[1])) && Number.isInteger(int(com[2])))
            {
              player.teleport(int(com[1]), int(com[2]));
              print("teleported player to {X: " + int(com[1]) + ", Y:" + int(com[2]) + "}")
            }
        }
        break;
      default:
        print("No command existing");
    }
}