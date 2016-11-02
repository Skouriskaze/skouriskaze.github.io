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
Vector.sub = function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
}


