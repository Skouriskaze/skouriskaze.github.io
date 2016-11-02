var Joystick = function() {
    this.touchId = -1;
    this.touchX = 0;
    this.touchY = 0;
    this.posX = 0;
    this.posY = 0;
    this.instantiated = false;
    this.crosshair = null;
    this.joystick= null;
};

Joystick.prototype.setInitialTouch = function(e) {
    this.posX = e.pageX;
    this.posY = e.pageY;
};

Joystick.prototype.extractTouch = function(e) {
    this.touchX = e.pageX;
    this.touchY = e.pageY;
};

Joystick.prototype.render = function(ctx) {
    if (this.instantiated) {
        this.joystick.render(ctx);
        this.crosshair.render(ctx);
    }
};
Joystick.prototype.update = function() {
    if (this.instantiated) {

        var dVec = this.getVector();

        this.joystick.posX = this.posX + dVec.x;
        this.joystick.posY = this.posY + dVec.y;
    }
};

Joystick.prototype.getVector = function() {
    var jVec = new Vector(this.touchX, this.touchY);
    var tVec = new Vector(this.posX, this.posY);
    var dVec = Vector.sub(jVec, tVec);

    if (dVec.magnitude > 100 / 3) {
        return Vector.setMagnitude(dVec, 100 / 3);
    }

    return dVec;
}

Joystick.prototype.makeJoystick = function(id, x, y) {
    this.touchId = id;
    this.crosshair = new Sprite('res/crosshair.png', x, y, 16, 16);
    this.joystick = new Sprite('res/joystick.png', x, y, 100, 100);
    this.instantiated = true;
};

Joystick.prototype.destroyJoystick = function() {
    this.touchId = -1;
    this.crosshair = null;
    this.joystick= null;
    this.instantiated = false;
    this.touchX = 0;
    this.touchY = 0;
    this.posX = 0;
    this.posY = 0;
};
