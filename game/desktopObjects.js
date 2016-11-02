var Player = function() {
    this.img = new Sprite('res/player.png', 200, 200, 64, 64);
    this.x = 200;
    this.y = 200;
    this.rightX = 0;
    this.rightY = 0;
    this.leftX = 0;
    this.leftY = 0;
    this.bullets = [];
    this.bulletCooldown = 0;
    this.color = "white";
}

Player.prototype.update = function(dt) {
    //Updating values
    if (this.bulletCooldown > 0) {
        this.bulletCooldown -= dt;
    }
    
   
    //Updating movement
    this.x += this.leftX * dt / 100;
    this.y += this.leftY * dt / 100;

    //Clamping
    this.x = Math.max(0 + 64, Math.min(720 - 64, this.x));
    this.y = Math.max(0 + 64, Math.min(720 - 64, this.y));

    this.img.posX = this.x;
    this.img.posY = this.y;

    //Making bullets
    if (this.rightX != 0 || this.rightY != 0) {
        if (this.bulletCooldown <= 0) {
            this.bullets.push(new Bullet(this.x, this.y, new Vector(this.rightX, this.rightY, this.color)));
            this.bulletCooldown = 500;
        }
    }

    //Updating bullets
    var del = [];
    for (var i = 0; i < this.bullets.length; i++) {
        if (!this.bullets[i].update(dt)) {
            del.push(i);
        }
    }
    for (var i = del.length - 1; i > -1; i--) {
        this.bullets.splice(i, 1);
    }
}

Player.prototype.render = function(ctx) {
    this.img.render(ctx);
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].render(ctx);
    }
}

var Bullet = function(x, y, dir, color) {
    dir = Vector.getUnitVector(dir);
    this.img = new Sprite('res/bullet.png', x, y, 8, 8);
    this.x = x;
    this.y = y;
    this.dx = dir.x;
    this.dy = dir.y;
    this.color = color;
}

Bullet.prototype.update = function(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    this.img.posX = this.x;
    this.img.posY = this.y;

    if (this.x < 0 || this.x > 720 || this.y < 0 || this.y > 720) { 
        return false;
    }
    return true;
}

Bullet.prototype.render = function(ctx) {
    this.img.render(ctx);
}
