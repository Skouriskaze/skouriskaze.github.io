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
    this.touchX = 0;
    this.touchY = 0;
    this.posX = 0;
    this.posY = 0;
    this.crosshair = null;
    this.joystick= null;
}

Joystick.prototype.extractTouch = function(e) {
    this.touchX = e.pageX;
    this.touchY = e.pageY;
}

Joystick.prototype.render = function(ctx) {
    if (null != this.joystick) {
        this.joystick.render(ctx);
    }
    if (null != this.crosshair) {
        this.crosshair.render(ctx);
    }
}
Joystick.prototype.update = function() {
    if (null != this.joystick) {
        this.joystick.posX = this.touchX;
        this.joystick.posY = this.touchY;
    }
}

Joystick.prototype.makeJoystick = function(x, y) {
    this.crosshair = new Sprite('res/crosshair.png', x, y, 16, 16);
    this.joystick = new Sprite('res/joystick.png', x, y, 100, 100);
}

Joystick.prototype.destroyJoystick = function() {
    this.crosshair = null;
    this.joystick= null;
}
