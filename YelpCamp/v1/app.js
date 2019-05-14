var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
        {name: "Half Moon Bay", image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
        {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"},
    ];

app.get("/", function(request, response){
    response.render("landing")
});

app.get("/campgrounds", function(request, response){
    response.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(request, response){
    var name = request.body.name;
    var image = request.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    
    response.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(request, response) {
    response.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started :)")
});