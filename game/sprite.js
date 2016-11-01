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
};

var Vector = function(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt(x * x + y * y);
    this.angle = Math.atan(-y / x);
    if (x <= 0) {
        this.angle += Math.PI;
    } else if (-y <= 0) {
        this.angle += 2 * Math.PI;
    }
    if (x == 0 && y == 0) {
        this.angle = 0;
    }
};

Vector.angleTo = function(v1, v2) {
    nx = v2.x - v1.x;
    ny = v2.y - v1.y
    var incident = new Vector(v2.x - v1.x, v2.y - v1.y);
    return incident.angle;
};
Vector.dist = function(v1, v2) {
    return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
};
Vector.setMagnitude = function(v1, magnitude) {
    return Vector.scale(Vector.getUnitVector(v1), magnitude);
}
Vector.scale = function(v1, scale) {
    return new Vector(v1.x * scale, v1.y * scale);
}
Vector.getUnitVector = function(v1) {
    return new Vector(v1.x / v1.magnitude, v1.y / v1.magnitude);
}
Vector.add = function(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
}
Vector.sub= function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
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

        var jVec = new Vector(this.touchX, this.touchY);
        var tVec = new Vector(this.posX, this.posY);
        var dVec = Vector.sub(jVec, tVec);
        if (dVec.magnitude > 100 / 3) {
            var nVec = Vector.setMagnitude(dVec, 100 / 3);
            this.joystick.posX = tVec.x + nVec.x;
            this.joystick.posY = tVec.y + nVec.y;
        } else {
            this.joystick.posX = this.touchX;
            this.joystick.posY = this.touchY;
        }
    }
};

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
};
