// Initialize Firebase
var config = {
    apiKey: "AIzaSyCpAMuvqaaAKaE2rRGZLl-LrMnckSU0Lk8",
    authDomain: "phonecontroller-e8084.firebaseapp.com",
    databaseURL: "https://phonecontroller-e8084.firebaseio.com",
    storageBucket: "phonecontroller-e8084.appspot.com",
    messagingSenderId: "795807116740"
};
firebase.initializeApp(config);

var database = firebase.database();

setJoystickData = function(which, joystick) {
    var vec = joystick.getVector();
    database.ref(username + "/" + which).set({ 
        "x" : vec.x,
        "y" : vec.y
    });
};
