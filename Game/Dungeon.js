function Dungeon (stage) {
  var rooms = [];
  var state;
  var currentRoom;
  var hero = new Hero();
  var message = new PIXI.Text("Save the princess!", {font: "32px courier", fill: "white"});
  var setupRooms = function() {
    /*
      LAYOUT:
        ________________________
        |       |       |      |
        |   1   |   0   |   5  |
        |___ ___|___ ___|___ __|
        |       |       |      |
        |   2       3       4  |
        |_______|_______|______|

    */
    for(i = 0; i < 6; i++){
      rooms[i] = new Room(hero, message);
      stage.addChild(rooms[i].getRoom());
    }
    stage.addChild(message);
    stage.addChild(hero.getSprite());
    rooms[0].setDoor({north: false, south: true, west: false, east: false});
    rooms[1].setDoor({north: false, south: true, west: false, east: false});
    rooms[2].setDoor({north: true, south: false, west: false, east: true});
    rooms[3].setDoor({north: true, south: false, west: true, east: true});
    rooms[4].setDoor({north: true, south: false, west: true, east: false});
    rooms[5].setDoor({north: false, south: true, west: false, east: false});
  }

  var room0 = function() {
    rooms[0].setVisibility(true);
    rooms[0].play();
    var door = rooms[0].doorHit();

    switch(door){
      case "s":
        state = room3;
        break;
      default:
        state = room0;
    }
  }
  var room1 = function() {
    rooms[1].setVisibility(true);
    rooms[1].play();
    var door = rooms[1].doorHit();

    switch(door){
      case "s":
        state = room2;
        break;
      default:
        state = room1;
    }
  }
  var room2 = function() {
    rooms[2].setVisibility(true);
    rooms[2].play();
    var door = rooms[2].doorHit();

    switch(door){
      case "n":
        state = room1;
        break;
      case "e":
        state = room3;
        break;
      default:
        state = room2;
    }
  }

  var room3 = function() {
    rooms[3].setVisibility(true);
    var door = rooms[3].doorHit();
     switch(door){
      case "n":
        if(hero.hasKey){
          state = gameOver;
        }
        else{
          message.setText("Door is locked!");
        }
        break;
      case "w":
        state = room2;
        break;
      case "e":
        state = room4;
        break;
      default:
        state = room3;
    }
    rooms[3].play();



  }
  var room4 = function() {
    rooms[4].setVisibility(true);
    rooms[4].play();
    var door = rooms[4].doorHit();

    switch(door){
      case "n":
        state = room5;
        break;
      case "w":
        state = room3;
        break;
      default:
        state = room4;
    }
  }
  var room5 = function() {
    rooms[5].setVisibility(true);
    rooms[5].play();
    var door = rooms[5].doorHit();

    switch(door){
      case "s":
        state = room4;
        break;
      default:
        state = room5;
    }
  }
  var gameOver = function() {
    hero.getSprite().visible = false;
    message.setText("You have saved\nthe princess!");
  }
    this.init = function() {
    setupRooms();
    rooms[3].mainRoom = true;

    var roomNumbers = [ 1, 2, 4, 5];
    rooms[roomNumbers[Math.round(Math.random()*(roomNumbers.length-1))]].spawnKey();
    state = room3;
  }
  this.init();

  this.play = function() {
    state();
  }



}