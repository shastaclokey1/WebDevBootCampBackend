var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Middleware = require("../middleware/");

//INDEX  - show list of all campgrounds
router.get("/", function(request, response){
    Campground.find({}, function(err, allCampgroundsInDB) {
       if (err) {
           console.log(err);
       } else {
           response.render("campgrounds/index", {campgrounds: allCampgroundsInDB});
       }
    });
});

//CREATE - add campground to the DB
router.post("/", Middleware.isLoggedIn, function(request, response){
    var name = request.body.name;
    var price = request.body.price;
    var image = request.body.image;
    var description = request.body.description;
    var author = {
        id: request.user._id,
        username: request.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: description, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            response.redirect("/campgrounds");
        }
    });
});

//NEW - Show form to add new campground
router.get("/new", Middleware.isLoggedIn, function(request, response) {
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

//EDIT- Show form to edit campground info
router.get("/:id/edit", Middleware.checkCampgroundOwnership, function(request, response) {
    Campground.findById(request.params.id, function(_err, campgroundInDB) {
        response.render("campgrounds/edit", {campground: campgroundInDB});
    });
});

//UPDATE- update campground with information from form
router.put("/:id", Middleware.checkCampgroundOwnership, function(request, response) {
    Campground.findByIdAndUpdate(request.params.id, request.body.campground, function(err, updatedCampgroundInDB) {
        if (err) {
            response.redirect("/campgrounds");
        } else {
            response.redirect("/campgrounds/" + request.params.id);
        }
    });
});

//DESTROY- remove a specific campground from database
router.delete("/:id", Middleware.checkCampgroundOwnership, function(request, response) {
    Campground.findByIdAndRemove(request.params.id, function(err, campgroundInDB) {
        if (err) {
            console.log(err);
        } else {
            Comment.deleteMany({_id: {$in: campgroundInDB.comments}}, function(err) {
                if (err) {
                    console.log(err);
                }
                response.redirect("/campgrounds");
            });
        }
    });
});

module.exports = router;