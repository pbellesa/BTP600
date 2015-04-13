// Room.js
// By Pedro Bellesa
function Room (hero, message) {

  var container = new PIXI.DisplayObjectContainer();
  var texture = PIXI.TextureCache["assets/dungeon.png"];
  var sprite = new PIXI.Sprite(texture);
  var doors = new Door();
  var goblins = [];
  var key = new Key();
  var hasKey = false;
  this.mainRoom = false;
  //var hero = new Hero();

  // Return reference to room instance
  this.getRoom = function() {
    return container;
  }

  // Constructor
  this.init = function(){
    container.visible = false;
    container.addChild(sprite);
    // Doors

    container.addChild(doors.north);
    container.addChild(doors.south);
    container.addChild(doors.west);
    container.addChild(doors.east);

    // Create goblins
    var goblinFactory = new GoblinFactory();
      goblins[0] = goblinFactory.createGoblin({
        goblinType: "udf",
        xPos: 150,
        yPos: 50
      });
      goblins[1] = goblinFactory.createGoblin({
        goblinType: "lrf",
        xPos: 150,
        yPos: 100
      });
      goblins[2] = goblinFactory.createGoblin({
        goblinType: "udf",
        xPos: 300,
        yPos: 100
      });
      goblins[3] = goblinFactory.createGoblin({
        goblinType: "lrf",
        xPos: 150,
        yPos: 300,
      });

      // Add Goblins
      container.addChild(goblins[0].goblin.getSprite());
      container.addChild(goblins[1].goblin.getSprite());
      container.addChild(goblins[2].goblin.getSprite());
      container.addChild(goblins[3].goblin.getSprite());

      // Animate Goblins
      goblins[0].goblin.animateFront();
      goblins[1].goblin.animateRight();
      goblins[2].goblin.animateRight();
      goblins[3].goblin.animateRight();

    // Key
    key.spawn();
    container.addChild(key.getSprite());
    key.getSprite().visible = false;

    //container.addChild(message);
    message.position.set(120, 240);
  }

  // Toggle Visibility
  this.setVisibility = function (visible){
    container.visible = visible;
  }

  // Sets room to spawn key
  this.spawnKey = function() {
    hasKey = true;
    key.getSprite().visible = true;
  }

  // Check for collisions with doors.
  this.doorHit = function() {
    if(hero.getSprite().visible){
      if (hitTestRectangle(hero.getSprite(), doors.north) && doors.north.visible) {
        if(!this.mainRoom){
          container.visible = false;
          this.setHeroPosition("south");
        }
        else if (hero.hasKey){
          container.visible = false;
        }

        return "n";
      }
      if (hitTestRectangle(hero.getSprite(), doors.south) && doors.south.visible) {
        container.visible = false;
        this.setHeroPosition("north");
        return "s";
      }
      if (hitTestRectangle(hero.getSprite(), doors.west) && doors.west.visible) {
        container.visible = false;
        this.setHeroPosition("east");
        return "w";
      }
      if (hitTestRectangle(hero.getSprite(), doors.east) && doors.east.visible) {
        container.visible = false;
        this.setHeroPosition("west");
        return "e";
      }
    }

    return null;
  }

  // Set Position of Hero according to the room size.
  this.setHeroPosition = function(position){
    switch(position) {
      case "north":
          hero.setPosition(240, 50);
          break;
      case "south":
          hero.setPosition(240, 410);
          break;
      case "west":
          hero.setPosition(50, 240);
          break;
      case "east":
          hero.setPosition(380, 240);
          break;
      default:
          hero.setPosition(240, 240);
    }
  }

  // Set all the doors, receives object with
  // north, south, east, west with boolean values
  this.setDoor = function(doorSet){
    if (!doorSet.north) {
      doors.north.visible = false;
    }
    if (!doorSet.south) {
      doors.south.visible = false;
    }
    if (!doorSet.west) {
      doors.west.visible = false;
    }
    if (!doorSet.east) {
      doors.east.visible = false;
    }
  }

  // Container play function to be called on loop
  this.play = function() {
          //Element movement

      hero.moveHero();

      goblins[0].goblin.moveVertical();
      goblins[1].goblin.moveHorizontal();
      goblins[2].goblin.moveVertical();
      goblins[3].goblin.moveHorizontal();

      for(i = 0; i < goblins.length; i++){
        if (hitTestRectangle(hero.getSprite(), goblins[i].goblin.getSprite())) {

          message.setText("Aaagghh, you died!");
          hero.getSprite().tint = 0xff3300;
          hero.getSprite().visible = false;
        }
      }

      if(hitTestRectangle(hero.getSprite(), key.getSprite()) && key.getSprite().visible) {
        message.setText("Free The princess!");
        hero.getSprite().tint = 0xffff00;
        key.getSprite().visible = false;
        hero.hasKey = true;
      }
  }

  // Run init ( contructor)
  this.init();
}