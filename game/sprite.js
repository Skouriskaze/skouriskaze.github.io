var Sprite = function(imgPath, x, y) {
    this.img = new Image();
    this.img.src = imgPath;
    this.posX = x;
    this.posY = y;
    console.log('Sprite created');
};

Sprite.prototype.render = function(ctx) {
    ctx.drawImage(this.img, this.posX, this.posY);
}
