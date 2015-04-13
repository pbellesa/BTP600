// Author: Maggie Ha
function Door() {
  // DOOR TILE SET FRAMES
  var frames = {
    north: new PIXI.Rectangle(224, 224, 32, 32),
    west: new PIXI.Rectangle(160, 96, 32, 32),
    south: new PIXI.Rectangle(128, 224, 32, 32),
    east: new PIXI.Rectangle(192, 96, 32, 32)
  };

  // DOOR TEXTURES
  var sprites = {
    north: new PIXI.Texture(PIXI.BaseTextureCache["assets/door-tile.png"], frames.north),
    south: new PIXI.Texture(PIXI.BaseTextureCache["assets/door-tile.png"], frames.south),
    west: new PIXI.Texture(PIXI.BaseTextureCache["assets/door-tile.png"], frames.west),
    east: new PIXI.Texture(PIXI.BaseTextureCache["assets/door-tile.png"], frames.east)
  };

  // DOOR SPRITE OBJECT
  this.north = new PIXI.Sprite(sprites.north);
  this.south = new PIXI.Sprite(sprites.south);
  this.west = new PIXI.Sprite(sprites.west);
  this.east = new PIXI.Sprite(sprites.east);

  // INITIALIZE
  this.init = function() {
    this.north.position.set(240, 0);
    this.south.position.set(240, 454);
    this.west.position.set(0, 240);
    this.east.position.set(472, 240);

  };

  this.init();

}