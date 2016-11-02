var username;

window.onload = function() {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {};
    for (var i = 0; i < params.length; i++) {
        var tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    username = data["username"];

    setupReader(function(snapshot) {
        player.color = snapshot.val().color;
    });

    addReader(function(snapshot) {
        left = snapshot.val().left;
        right= snapshot.val().right;
        player.leftX = left["x"];
        player.leftY = left["y"];
        player.rightX = right["x"];
        player.rightY = left["y"];
    });

    player = new Player();
    gameLoop();
}
