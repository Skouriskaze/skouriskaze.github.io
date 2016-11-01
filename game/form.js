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
}
