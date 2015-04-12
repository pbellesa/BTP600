function Room (hero) {

  var container = new PIXI.DisplayObjectContainer();
  var texture = PIXI.TextureCache["assets/dungeon.png"];
  var sprite = new PIXI.Sprite(texture);
  var doors = new Door();
  var goblin = new Goblin();
  var key = new Key();
  var message = new PIXI.Text("Save the princess!", {font: "32px courier", fill: "white"});
  var hasKey = false;
  //var hero = new Hero();

  this.getRoom = function() {
    return container;
  }


  this.init = function(){
    console.log(hero);
    container.visible = false;
    container.addChild(sprite);
    // Doors

    container.addChild(doors.north);
    container.addChild(doors.south);
    container.addChild(doors.west);
    container.addChild(doors.east);

    // Hero
    //container.addChild(hero.getSprite());

    // Goblin
    container.addChild(goblin.getSprite());
    goblin.animateFront();

    // Key

    key.spawn();
    container.addChild(key.getSprite());
    key.getSprite().visible = false;

    container.addChild(message);
    message.position.set(120, 240);
  }

  this.setVisibility = function (visible){
    container.visible = visible;
  }
  this.spawnKey = function() {
    hasKey = true;
    key.getSprite().visible = true;
  }
  // Check for collisions with doors.
  this.doorHit = function() {
    if (hitTestRectangle(hero.getSprite(), doors.north) && doors.north.visible) {
      container.visible = false;
      this.setHeroPosition("south");
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
    return null;
  }

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

      goblin.moveVertical();


      if (hitTestRectangle(hero.getSprite(), goblin.getSprite())) {

        message.setText("Aaagghh, you died!");
        hero.getSprite().tint = 0xff3300;
        //hero.getSprite().visible = false;
      }
      else if(hitTestRectangle(hero.getSprite(), key.getSprite()) && key.getSprite().visible) {
        message.setText("Free The princess!");
        hero.getSprite().tint = 0xffff00;
        key.getSprite().visible = false;
      }
      else {
        //if there's no collision, reset the message text
        //and the hero's colour
        //this.message.setText("No collision...");
        //hero.getSprite().tint = 0xffffff;
      }
  }

  // Run init ( contructor)
  this.init();
}