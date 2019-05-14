var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(request, response) {
    response.render("home");
});

app.get("/fallinlovewith/:thing", function(request, response) {
    var thing = request.params.thing;
    response.render("love", {theThingVar: thing});
});

app.get("/posts", function(request, response) {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Shasta"},
    ];
    response.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening!!!");
});