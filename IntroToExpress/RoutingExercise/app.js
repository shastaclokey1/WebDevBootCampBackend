var express = require("express");
var app = express();

app.get("/", function(request, response) {
    response.send("Hi there, welcome to my assignment!"); 
});

app.get("/speak/:animal", function(request, response) {
    var animal = request.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "Merow",
        fish: "BANG YOU'RE DEAD MOTHA FUCKA!",
    }
    if (sounds[animal] == undefined) {
        response.send("The " + animal + " says 'Fack off human'");
    } else {
        response.send("The " + animal + " says '" + sounds[animal] + "'");
    }
    
});

app.get("/repeat/:wordtorepeat/:numrepeat", function(request, response) {
    var word = request.params.wordtorepeat;
    var numRepeats = parseInt(request.params.numrepeat, 10);
    var stringBuilder = "";
    for (var i = 0; i < numRepeats; i++) {
        stringBuilder += word;
        stringBuilder += " ";
    }
    response.send(stringBuilder);
});

app.get("*", function(request, response) {
    response.send("Sorry, page not fount...What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});