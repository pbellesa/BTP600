function Room () {

  var container = new PIXI.DisplayObjectContainer();
  var texture = PIXI.TextureCache["assets/dungeon.png"];
  var sprite = new PIXI.Sprite(texture);
  var doors = new Door();
  var hero = new Hero();
  var goblin = new Goblin();
  var key = new Key();
  var message = new PIXI.Text("Save the princess!", {font: "32px courier", fill: "white"});


  this.getRoom = function() {
    return container;
  }


  this.init = function(){
    container.addChild(sprite);

    // Doors

    container.addChild(doors.north);
    container.addChild(doors.south);
    container.addChild(doors.west);
    container.addChild(doors.east);

    // Hero
    container.addChild(hero.getSprite());

    // Goblin
    container.addChild(goblin.getSprite());
    goblin.animateFront();

    // Key

    key.spawn();
    container.addChild(key.getSprite());

    container.addChild(message);
    message.position.set(128, 256);
  }

  // Check for collisions with doors.
  this.doorHit = function() {
    if (hitTestRectangle(hero.getSprite(), doors.north) && doors.north.visible) {
      container.visible = false;
      return "n";
    }
    else if (hitTestRectangle(hero.getSprite(), doors.south) && doors.south.visible) {
      container.visible = false;
      return "s";
    }
    else if (hitTestRectangle(hero.getSprite(), doors.west) && doors.west.visible) {
      container.visible = false;
      return "w";
    }
    else if (hitTestRectangle(hero.getSprite(), doors.east) && doors.east.visible) {
      container.visible = false;
      return "e";
    }
  }

  this.setHeroPosition = function(position){
    switch
  }
  // Set all the doors, receives object with
  // north, south, east, west with boolean values
  this.setDoor = function(doorSet){
    if (!doorSet.north) {
      doors.north.visible = false;
    }
    else if (!doorSet.south) {
      doors.south.visible = false;
    }
    else if (!doorSet.west) {
      doors.west.visible = false;
    }
    else if (!doorSet.east) {
      doors.east.visible = false;
    }

  }

  // Container play function to be called on loop
  this.play = function() {
          //Element movement
      hero.moveHero();
      goblin.moveVertical();

      this.doorHit();

      //check for a collision between the Hero and the Goblin
      if (hitTestRectangle(hero.getSprite(), goblin.getSprite())) {
        //if there's a collision, change the message text
        //and tint the box red
        message.setText("Aaagghh, you died!");
        hero.getSprite().tint = 0xff3300;
        hero.getSprite().visible = false;
      }
      else if(hitTestRectangle(hero.getSprite(), key.getSprite())) {
        //if there's a collision, change the message text
        //and tint the box red
        message.setText("Free The princess!");
        hero.getSprite().tint = 0xffff00;
        key.getSprite().visible = false;
      }
      else {
        //if there's no collision, reset the message text
        //and the hero's colour
        //this.message.setText("No collision...");
        hero.getSprite().tint = 0xffffff;
      }
  }

  // Run init ( contructor)
  this.init();
}