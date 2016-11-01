var Sprite = function(imgPath, x, y, width, height) {
    this.img = new Image();
    this.img.src = imgPath;
    this.posX = x;
    this.posY = y;
    this.width = width;
    this.height = height;
};

Sprite.prototype.render = function(ctx) {
    ctx.drawImage(this.img, this.posX - this.width / 2, this.posY - this.height / 2);
}


var Joystick = function() {
    this.touchId = -1;
    this.touchX = 0;
    this.touchY = 0;
    this.posX = 0;
    this.posY = 0;
    this.instantiated = false;
    this.crosshair = null;
    this.joystick= null;
}

Joystick.prototype.extractTouch = function(e) {
    this.touchX = e.pageX;
    this.touchY = e.pageY;
}

Joystick.prototype.render = function(ctx) {
    if (this.instantiated) {
        this.joystick.render(ctx);
        this.crosshair.render(ctx);
    }
}
Joystick.prototype.update = function() {
    if (this.instantiated) {
        this.joystick.posX = this.touchX;
        this.joystick.posY = this.touchY;
    }
}

Joystick.prototype.makeJoystick = function(id, x, y) {
    this.touchId = id;
    this.crosshair = new Sprite('res/crosshair.png', x, y, 16, 16);
    this.joystick = new Sprite('res/joystick.png', x, y, 100, 100);
    this.instantiated = true;
}

Joystick.prototype.destroyJoystick = function() {
    this.touchId = -1;
    this.crosshair = null;
    this.joystick= null;
    this.instantiated = false;
}
