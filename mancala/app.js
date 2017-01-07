// JavaScript source code

var tabList = [];
var games = {};

function inList(list, element) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == element) {
            return true;
        }
    }
    return false;
}

function addTab() {
    console.log("We adding2");
    var input = $('<input>').attr('id', 'gameName'); // Textbox to be added

    // Changing tab
    $('#newGameLabel').text("");
    $('#addTab').attr('onclick', '');
    $('#newGameForm').append(input);

    // Autofocus textbox
    input.focus();

    // Setting input dissapear
    input.focusout(function () {
        if (!input.val())
            clearAddTab()
        else
            addGame()
    });
}

function clearAddTab(cancelTab) {
    var gameName = $('#gameName');
    var name = gameName.val();

    // Resetting tab
    $('#addTab').attr('onclick', 'addTab()');
    $('#newGameLabel').text("+");
    $('#newGameForm').empty();
}

function addGame() {
    // Tab Stuff ------------------------------------------------------------
    var gameName = $('#gameName');
    var name = gameName.val().replace(/[^a-zA-Z]/g, '');
    console.log(name);
    var tabExists = inList(tabList, name);

    if (!tabExists) {
    // Adding tab
        tabList.push(name);
        games[name] = new Mancala();
        var addItem = $('#addItem');
        var anchor = $('<a>')
            .attr('data-toggle', 'tab')
            .attr('href', '#' + name)
            .text(name);

        $('<li>').append(anchor).insertBefore(addItem);
        // Tab Content Stuff -----------------------------------------------------
        var tabContent = $('#tabContent');
        var tabToAdd = $('<div>').attr('id', name).addClass('tab-pane fade');
        var canvas = $('<canvas>').attr('id', name + 'Canvas').attr('width', '720').attr('height', '360');

        tabToAdd.append($('<h3>').text(name));
        tabToAdd.append(canvas);

        tabContent.append(tabToAdd);

        anchor.click();

        drawMancala(canvas, name);
    }

    clearAddTab();
}

function drawMancala(canvas, name) {
    var htmlCanvas = document.getElementById(name + 'Canvas');
    canvas.drawRect({
        layer: true,
        fromCenter: false,
        fillStyle: 'gray',
        x: 0,
        y: 0,
        width: 720,
        height: 720 / 2
    })
    var width = 720;
    var height = 360;
    var margin = 15;
    var circleDiameter = 75;
    var sixth = (width - 2 * 99) / 6
    var rectWidth = (width - 2 * margin) / 10;
    var rectHeight = 2 * (height / 4 + circleDiameter / 2);
    canvas.drawRect({ // Red pit
        layer: true,
        fillStyle: 'red',
        x: margin + rectWidth / 2, y: height / 2,
        width: rectWidth,
        height: rectHeight,
        cornerRadius: 20
    });
    canvas.drawText({ // Red pit text
        layer: true,
        fillStyle: 'white',
        x: margin + rectWidth / 2, y: height / 2,
        text: '0',
        fontSize: circleDiameter / 2,
        fontFamily: 'Verdana, sans-serif',
        name: 'tred'
    });
    canvas.drawRect({ // Green pit
        layer: true,
        fillStyle: 'green',
        x: width - rectWidth / 2 - margin, y: height / 2,
        width: rectWidth,
        height: rectHeight,
        cornerRadius: 20
    });
    canvas.drawText({ // Green pit text
        layer: true,
        fillStyle: 'white',
        x: width - rectWidth / 2 - margin, y: height / 2,
        text: '0',
        fontSize: circleDiameter / 2,
        fontFamily: 'Verdana, sans-serif',
        name: 'tgreen'
    });

    for (var i = 0; i < 6; i++) {
        canvas.drawEllipse({
            layer: true,
            fillStyle: 'blue',
            x: 99 + (5 - i) * sixth + sixth / 2,
            y: height / 4,
            width:circleDiameter ,
            height:circleDiameter ,
            click: function (layer) {
                // Todo
                var color = layer.name.replace(/[^a-zA-Z]/g, '');
                var rank = parseInt(layer.name.replace(/[^0-9]/g, ''));
                var move = new Pit(color, rank);
                performMove(name, canvas, move);
            },
            name: 'red' + i.toString()
        });
        canvas.drawText({
            layer: true,
            align: 'center',
            fillStyle: 'white',
            x: 99 + (5 - i) * sixth + sixth / 2,
            y: height / 4,
            fontSize: circleDiameter / 2,
            fontFamily: 'Verdana, sans-serif',
            text: games[name].board['red'][i].toString(),
            name: 'tred' + i.toString()
        });
    }
    for (var i = 0; i < 6; i++) {
        canvas.drawEllipse({
            layer: true,
            fillStyle: 'cyan',
            x: rectWidth + 2 * margin + i * sixth + sixth / 2,
            y: 3 * height / 4,
            width:circleDiameter ,
            height:circleDiameter ,
            click: function (layer) {
                // Todo
                var color = layer.name.replace(/[^a-zA-Z]/g, '');
                var rank = parseInt(layer.name.replace(/[^0-9]/g, ''));
                var move = new Pit(color, rank);
                performMove(name, canvas, move);
            },
            name: 'green' + i.toString()
        });
        canvas.drawText({
            layer: true,
            align: 'center',
            fillStyle: 'white',
            x: rectWidth + 2 * margin + i * sixth + sixth / 2,
            y: 3 * height / 4,
            fontSize: circleDiameter / 2,
            fontFamily: 'Verdana, sans-serif',
            text: games[name].board['green'][i].toString(),
            name: 'tgreen' + i.toString()
        });
    }
}

function performMove(name, canvas, move) {
    var text = canvas.getLayer('t' + move.toString());
    var game = games[name];
    if (game.makeTurn(move)) {
        if (move.color == "red") {
            canvas.animateLayer(text, {
                y: '+=' + text.height,
                rotate: '+=180'
            });
            canvas.animateLayer(text, {
                y: '-=' + text.height,
                rotate: '+=180'
            });
            // text.text = "0";
        } else if (move.color == "green") {
            canvas.animateLayer(text, {
                y: '-=' + text.height,
                rotate: '+=180'
            });
            canvas.animateLayer(text, {
                y: '+=' + text.height,
                rotate: '+=180'
            });
        }

        for (var i = 0; i < 6; i++) {
            canvas.getLayer('tred' + i).text = game.board['red'][i];
            canvas.getLayer('tgreen' + i).text = game.board['green'][i];
        }
    }
}
