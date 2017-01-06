// JavaScript source code
$('newGameForm').submit(function (e) {
    e.preventDefault();
    addGame();
});

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
    // input.focusout(clearAddTab);
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
    console.log("We adding");
    var gameName = $('#gameName');
    var name = gameName.val();

    // Adding tab
    var addItem = $('#addItem');
    var anchor = $('<a>')
        .attr('data-toggle', 'tab')
        .attr('href', '#' + name)
        .text(name);

    $('<li>').append(anchor).insertBefore(addItem);
    clearAddTab();



    // Tab Content Stuff ---------------------------------------------------
    var tabContent = $('#tabContent');
    var tabToAdd = $('<div>').attr('id', name).addClass('tab-pane fade');
    tabToAdd.append($('<h3>').text(name));

    tabContent.append(tabToAdd);

    anchor.click();
}
