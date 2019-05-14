var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Lily"];

app.get("/", function(request, response) {
    response.render("home");
});

app.get("/friends", function(request, response) {
    response.render("friends", {friends: friends});
});

app.post("/addfriend", function(request, response) {
    var newFriend = request.body.newfriend;
    friends.push(newFriend);
    response.redirect("/friends");
})

app.listen(process.env.PORT, process.env.IP, function(request, response) {
    console.log("Server Started!!");
});