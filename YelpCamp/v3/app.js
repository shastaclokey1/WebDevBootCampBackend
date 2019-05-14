var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

app.get("/", function(request, response){
    response.render("landing")
});

//INDEX  - show list of all campgrounds
app.get("/campgrounds", function(request, response){
    Campground.find({}, function(err, allCampgroundsInDB) {
       if (err) {
           console.log("OH NO, ERROR!");
           console.log(err);
       } else {
           response.render("index", {campgrounds: allCampgroundsInDB});
       }
    });
});

//CREATE - add campground to the DB
app.post("/campgrounds", function(request, response){
    var name = request.body.name;
    var image = request.body.image;
    var description = request.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            response.redirect("/campgrounds");
        }
    });
});

//NEW - Show form to add new campground
app.get("/campgrounds/new", function(request, response) {
    response.render("new");
});

//SHOW- Show campground specific info
app.get("/campgrounds/:id", function(request, response) {
    Campground.findById(request.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            response.render("show", {campground: foundCampground});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started :)")
});