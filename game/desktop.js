var canvas = document.getElementById("joystick1");
var ctx1 = canvas.getContext("2d");
var player;

window.onload = function() {
    player = setupReader(function() {});
}
