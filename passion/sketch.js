// sketch.js

var img_easter;
var b_draw;

var n_pieceColumns;
var n_pieceRows;
var arr_pieces = []


function preload() {
    img_easter = loadImage("res/easter.jpg");
    b_draw = false;
}

function setup() {
    createCanvas(640, 480);

    n_pieceColumns = 30;
    n_pieceRows = 15;
    width = img_easter.width / n_pieceColumns;
    height = img_easter.height / n_pieceRows;

    for (var i = 0; i < n_pieceColumns; i++) {
        for (var j = 0; j < n_pieceRows; j++) {
            curPiece = new Piece(i * width, j * height, width, height);
            arr_pieces.push(curPiece);
        }
    }
    arr_pieces.sort(function(a, b) {return 0.5 - Math.random()});
}

function draw() {
    if (b_draw) {
        for (var i = 0; i < 3; i++) {
            curPiece = arr_pieces.pop();
            if (curPiece) {
                image(img_easter, curPiece.x, curPiece.y, curPiece.width, curPiece.height, curPiece.x, curPiece.y, curPiece.width, curPiece.height);
            }
        }
        b_draw = false;
    } else {
    }
}

function mousePressed() {
    b_draw = true;
}

