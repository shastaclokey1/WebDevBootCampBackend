var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(request, response){
   response.send("Hi there, BITCH!"); 
});
// "/bye" => "Goodbye!"
app.get("/bye", function(request, response){
   response.send("Goodbye!"); 
});
// "/dog" => ""MEOW!
app.get("/dog", function(request, response){
   response.send("MEOW!"); 
});

app.get("/r/:subName", function(request, response) {
   var subreddit = request.params.subName;
   response.send("Welcome to the " + subreddit + " sub!"); 
});

app.get("/r/:subName/:title", function(request, response) {
    var subName = request.params.subName;
    var postTitle = request.params.title;
    response.send("Welcome to the " + subName + " sub! \n Enjoy " + postTitle + "!");
});

app.get("*", function(request, response) {
    response.send("You have tried to access an unspecified route");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});