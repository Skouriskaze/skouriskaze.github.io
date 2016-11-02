var Player = function() {
    this.img = new Sprite('res/player.png', 200, 200, 64, 64);
    this.x = 200;
    this.y = 200;
    this.rightX = 0;
    this.rightY = 0;
    this.leftX = 0;
    this.leftY = 0;
    this.color;
}

Player.prototype.update = function(dt) {
    this.x += this.leftX * dt / 100;
    this.y += this.leftY * dt / 100;

    this.img.posX = this.x;
    this.img.posY = this.y;
}

Player.prototype.render = function(ctx) {
    this.img.render(ctx);
}
