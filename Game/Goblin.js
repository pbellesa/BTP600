function Goblin () {
  // TILE SET FRAMES
  var frames = {
        front: [new PIXI.Rectangle(0, 0, 30, 30), new PIXI.Rectangle(32, 0, 30, 30),new PIXI.Rectangle(64, 0, 30, 30)],
        left: [new PIXI.Rectangle(0, 32, 30, 30), new PIXI.Rectangle(32, 32, 30, 30),new PIXI.Rectangle(64, 32, 30, 30)],
        right: [new PIXI.Rectangle(0, 64, 30, 30), new PIXI.Rectangle(32, 64, 30, 30),new PIXI.Rectangle(64, 64, 30, 30)],
        back: [new PIXI.Rectangle(0, 96, 30, 30), new PIXI.Rectangle(32, 96, 30, 30),new PIXI.Rectangle(64, 96, 30, 30)]
      };

  // GOBLIN TEXTURE OBJECT
  var texture = new PIXI.Texture(PIXI.BaseTextureCache["assets/goblin.png"], frames.front[0]);

  // GOBLIN SPRITE OBJECT
  this.sprite = new PIXI.Sprite(texture);

  var animationCounter = 0;
  var animationInterval = null;

  this.init = function() {
    this.sprite.x = 64;
    this.sprite.y = 64;

    this.sprite.vy = 5;
    this.sprite.vx = 5;
  }
  this.init();

  this.animateFront = function() {
    if(animationInterval != null){
      clearInterval(animationInterval);
      animationCounter = 0;
    }

    texture.setFrame(frames.front[animationCounter]);
    animationInterval = setInterval(function() {
      texture.setFrame(frames.front[animationCounter]);
      animationCounter = (animationCounter + 1) % 3;
    }, 100);
  };

  this.animateBack = function() {
    if(animationInterval != null){
      clearInterval(animationInterval);
      animationCounter = 0;
    }

    texture.setFrame(frames.back[animationCounter]);
    animationInterval = setInterval(function() {
      texture.setFrame(frames.back[animationCounter]);
      animationCounter = (animationCounter + 1) % 3;
    }, 100);
  };
  this.setPosition = function (x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  };

  this.setSpeed = function(vx, vy) {
    this.sprite.vx = vx;
    this.sprite.vy = vy;
  };

  this.getSprite = function() {
    return this.sprite;
  };

  this.moveVertical = function() {
          //Move the blob
      this.sprite.y += this.sprite.vy;
      //Check the blob's screen boundaries
      var wallHit = contain(this.sprite, {x: 28, y: 10, width: 488, height: 480});

      //If the blob hits the top or bottom of the stage, reverse
      //its direction
      if (wallHit === "top") {
        this.sprite.vy *= -1;
        this.animateFront();
      }

      if (wallHit === "bottom") {
        this.sprite.vy *= -1;
        this.animateBack();
      }
  }

};