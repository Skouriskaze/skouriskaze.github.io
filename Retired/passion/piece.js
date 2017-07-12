function Piece(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.img = img;

    this.draw = function () {
        console.log("We drew it!");
    }
}