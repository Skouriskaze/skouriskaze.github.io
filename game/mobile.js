var canvas = document.getElementById("joystick1");
var ctx1 = canvas.getContext("2d");


var leftJoystick = new Joystick();
var rightJoystick = new Joystick();

ctx1.canvas.height = window.innerHeight * 99 / 100;

window.addEventListener('resize', function() {
    ctx1.canvas.height = window.innerHeight * 99 / 100;
    ctx1.canvas.width = 720;
});


canvas.addEventListener('touchstart', touchStart, false);
canvas.addEventListener('touchend', touchEnd, false);
canvas.addEventListener('touchmove', onTouchMove, false);
canvas.addEventListener('mousedown', onClick, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mouseup', onUp, false);

loadImage([
        'res/crosshair.png',
        'res/joystick.png']);


function onClick(e) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;

    //Create a new joystick
    if (!leftJoystick.instantiated && x < 720 / 2) {
        leftJoystick.setInitialTouch(e);
        leftJoystick.extractTouch(e);
        leftJoystick.makeJoystick(-1, x, y);
    } else if (!rightJoystick.instantiated && x > 720 / 2) {
        rightJoystick.setInitialTouch(e);
        rightJoystick.extractTouch(e);
        rightJoystick.makeJoystick(-1, x, y);
    }
}

function touchStart(e) {
    e.preventDefault();

    //Create a new joystick
    for (var i = 0; i < e.changedTouches.length; i++) {
        var touch = e.changedTouches[i];
        var x = touch.pageX - canvas.offsetLeft;
        var y = touch.pageY - canvas.offsetTop;

        if (!leftJoystick.instantiated && x < 720 / 2) {
            leftJoystick.setInitialTouch(touch);
            leftJoystick.extractTouch(touch);
            leftJoystick.makeJoystick(touch.identifier, x, y);
        } else if (!rightJoystick.instantiated && x > 720 / 2) {
            rightJoystick.setInitialTouch(touch);
            rightJoystick.extractTouch(touch);
            rightJoystick.makeJoystick(touch.identifier, x, y);
        }
    }
}

function onMouseMove(e) {
    //Update joystick location
    leftJoystick.extractTouch(e);
    rightJoystick.extractTouch(e);
}

function onTouchMove(e) {
    //Update joystick location

    for (var i = 0; i < e.touches.length; i++) {
        var touch = e.touches[i];
        if (touch.identifier == leftJoystick.touchId) {
            leftJoystick.extractTouch(touch);
        } else if (touch.identifier == rightJoystick.touchId) {
            rightJoystick.extractTouch(touch);
        }
    }
}

function touchEnd(e) {
    //Destroy joysticks

    for (var i = 0; i < e.changedTouches.length; i++) {
        var touch = e.changedTouches[i];
        if (touch.identifier == leftJoystick.touchId) {
            leftJoystick.destroyJoystick();
        } else if (touch.identifier == rightJoystick.touchId) {
            rightJoystick.destroyJoystick();
        }
    }
}

function onUp(e) {
    //Destroy joysticks
    leftJoystick.destroyJoystick();
    rightJoystick.destroyJoystick();
}

function gameLoop() {
    update();
    render();

    requestAnimFrame(gameLoop);
}

function update() {
    if (leftJoystick.instantiated) {
        leftJoystick.update();
        setJoystickData("left", leftJoystick);
    }
    if (rightJoystick.instantiated) {
        rightJoystick.update();
        setJoystickData("right", rightJoystick);
    }

    setLastUsed();
}

function render() {
    //Draw background
    ctx1.fillStyle = color;
    ctx1.rect(0, 0, canvas.width, canvas.height);
    ctx1.fill();

    //Render joysticks
    leftJoystick.render(ctx1);
    rightJoystick.render(ctx1);
}
