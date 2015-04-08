function Key() {
	// GOLBALS
	var NUM_ROOMS = 6;
	var ROOM_HEIGHT = 500;
	var ROOM_WIDTH = 500;
	var KEY_OFFSET = 125;
	// KEY TEXTURE OBJECT
	var texture = new PIXI.Texture(PIXI.BaseTextureCache["assets/key.png"]);
	// KEY SPRITE OBJECT
	this.sprite = new PIXI.Sprite(texture);
	// INITIALIZATION
	this.init = function() {
		this.sprite.x = 0; // x position relative to parent
		this.sprite.y = 0; // y position relative to parent
		this.sprite.width = 32; // width of the item
		this.sprite.height = 32; // height of the item
		this.sprite.interactive = true; // set true to have touch ability
		console.log(texture);
	}
	this.init();
	// SETTERS
	this.setPosition = function(x, y) {
		this.sprite.x = x;
		this.sprite.y = y;
	};
	// GETTERS
	this.getSprite = function() {
		return this.sprite;
	};
	this.spawn = function() {
		// Generate a random number between 1 and number of rooms
		var spawnRoom = Math.floor((Math.random() * NUM_ROOMS) + 1);
		var spawnPosX = Math.floor((Math.random() * ROOM_WIDTH - 100) + 50);
		var spawnPosY = Math.floor((Math.random() * ROOM_HEIGHT - 100) + 50);
		// set boundaries of the key
		if (spawnPosX <= KEY_OFFSET)
			spawnPosX = KEY_OFFSET;
		if (spawnPosX >= ROOM_WIDTH)
			spawnPosX = ROOM_WIDTH - KEY_OFFSET;
		if (spawnPosY <= KEY_OFFSET)
			spawnPosY = KEY_OFFSET;
		if (spawnPosY >= ROOM_HEIGHT)
			spawnPosY = ROOM_HEIGHT - KEY_OFFSET;
		// get rooms
		// attach key to a room's stage 
		// selectedRoom.setPosition(spawnPosX, spwanPosY);
		this.setPosition(spawnPosX, spawnPosY);
	}
};