//Hero class
function Hero() {

    //Create a rectangle object that defines the position and
    //size of the sub-image you want to extract from the texture
    frames = {
        front: [new PIXI.Rectangle(188, 128, 30, 30), new PIXI.Rectangle(220, 128, 30, 30), new PIXI.Rectangle(252, 128, 30, 30)],
        back: [new PIXI.Rectangle(188, 224, 30, 30), new PIXI.Rectangle(220, 224, 30, 30), new PIXI.Rectangle(252, 224, 30, 30)],
        right: [new PIXI.Rectangle(188, 192, 30, 30), new PIXI.Rectangle(220, 192, 30, 30), new PIXI.Rectangle(252, 192, 30, 30)],
        left: [new PIXI.Rectangle(188, 160, 30, 30), new PIXI.Rectangle(220, 160, 30, 30), new PIXI.Rectangle(252, 160, 30, 30)]
    };

    //Loads texture from tileset
    var texture = new PIXI.Texture(PIXI.BaseTextureCache["assets/tileset.png"], frames.front[0]);
    this.hasKey = false;
    //Tell the texture to use that rectangular section
    this.sprite = new PIXI.Sprite(texture);

    //sprites.hero.setFrame(frames.hero.front[0]);
    var animationCounter = 0;
    var animationInterval = null;

    //Constructor to set initial speed and location of sprite (hero)
    this.init = function() {
        //location
        this.sprite.x = 240;
        this.sprite.y = 240;

        //speed
        this.sprite.vy = 0;
        this.sprite.vx = 0;
    }
    this.init();

    /***********Setters begin***********/
    this.setPosition = function(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    };

    this.setSpeed = function(vx, vy) {
        this.sprite.vx = vx;
        this.sprite.vy = vy;
    };
    /************Setters end************/

    /***********Getters begin***********/

    this.getSprite = function() {
        return this.sprite;
    };

    /************Getters end************/


    //Move function to control hero keyboard movements

    this.moveHero = function() {
        // Handle Keyboard
        //Capture the keyboard arrow keys
        var left = keyboard(37),
            up = keyboard(38),
            right = keyboard(39),
            down = keyboard(40);

        //Create inner scope for this object
        innerHero = this.getSprite();

        //Handle sprite collision by setting boundaries
        contain(this.sprite, {
            x: 28,
            y: 10,
            width: 488,
            height: 480
        });

        //Left arrow key `press` method
        var interval;
        left.press = function() {
            //Change the hero's velocity when the key is pressed
            innerHero.vx = -3;
            innerHero.vy = 0;
            var counter = 0;
            clearInterval(interval);
            texture.setFrame(frames.left[counter]);
            interval = setInterval(function() {
                texture.setFrame(frames.left[counter]);
                counter = (counter + 1) % 3;
            }, 100);
        };
        //Left arrow key `release` method
        left.release = function() {
            //If the left arrow has been released, and the right arrow isn't down,
            //and the hero isn't moving vertically:
            //Stop the hero
            if (!right.isDown && innerHero.vy === 0) {
                innerHero.vx = 0;
                clearInterval(interval);
            }
        };

        //Up
        var upTimeout;
        up.press = function() {
            innerHero.vy = -3;
            innerHero.vx = 0;
            var counter = 0;
            texture.setFrame(frames.back[counter]);
            clearInterval(interval);
            interval = setInterval(function() {
                texture.setFrame(frames.back[counter]);
                counter = (counter + 1) % 3;
            }, 100);
        };
        up.release = function() {
            if (!down.isDown && innerHero.vx === 0) {
                innerHero.vy = 0;
                clearInterval(interval);
            }
        };

        //Right
        var rightTimeout;
        right.press = function() {
            innerHero.vx = 3;
            innerHero.vy = 0;
            var counter = 0;
            texture.setFrame(frames.right[counter]);
            clearInterval(interval);
            interval = setInterval(function() {
                texture.setFrame(frames.right[counter]);
                counter = (counter + 1) % 3;
            }, 100);
        };
        right.release = function() {
            if (!left.isDown && innerHero.vy === 0) {
                innerHero.vx = 0;
                clearInterval(interval);
            }
        };

        //Down
        var downTimeout;
        down.press = function() {

            innerHero.vy = 3;
            innerHero.vx = 0;

            var counter = 0;
            texture.setFrame(frames.front[counter]);
            clearInterval(interval);
            interval = setInterval(function() {
                texture.setFrame(frames.front[counter]);
                counter = (counter + 1) % 3;
            }, 100);
        };
        down.release = function() {
            if (!up.isDown && innerHero.vx === 0) {
                innerHero.vy = 0;
                clearInterval(interval);
            }
        };

        //updates player location based on speed.
        this.sprite.x += innerHero.vx;
        this.sprite.y += innerHero.vy;
    }
};