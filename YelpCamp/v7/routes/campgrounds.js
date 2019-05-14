var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");

//INDEX  - show list of all campgrounds
router.get("/", function(request, response){
    Campground.find({}, function(err, allCampgroundsInDB) {
       if (err) {
           console.log("OH NO, ERROR!");
           console.log(err);
       } else {
           response.render("campgrounds/index", {campgrounds: allCampgroundsInDB});
       }
    });
});

//CREATE - add campground to the DB
router.post("/", isLoggedIn, function(request, response){
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
router.get("/new", isLoggedIn, function(request, response) {
    response.render("campgrounds/new");
});

//SHOW- Show campground specific info
router.get("/:id", function(request, response) {
    Campground.findById(request.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            response.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect("/login");
    }
}

module.exports = router;