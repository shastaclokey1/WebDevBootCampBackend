var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(request, response) {
    response.render("home");
});

app.get("/about", function(request, response) {
    response.render("about");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("The Deploying Demo Server Has Started :)");
});