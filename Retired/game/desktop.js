var canvas = document.getElementById("joystick1");
var ctx = canvas.getContext("2d");

var player;

var gameTime = Date.now();

function gameLoop() {
    var dt = Date.now() - gameTime;
    gameTime = Date.now();
    update(dt);
    render();

    requestAnimFrame(gameLoop);
}

function update(dt) {
    player.update(dt);
}

function render() {
    ctx.fillStyle = "white";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    player.render(ctx);

}
