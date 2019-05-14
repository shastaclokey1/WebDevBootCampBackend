var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campgroundInDB) {
        if (err) {
            console.log(err);
        } else {
            response.render("comments/new", {campground: campgroundInDB});
        }
    });
});

router.post("/", isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campgroundInDB) {
        if (err) {
            console.log(err);
            response.redirect("/campgrounds");
        } else {
            Comment.create(request.body.comment, function(err, commentInDB) {
                if (err) {
                    console.log(err);
                } else {
                    commentInDB.author.id = request.user._id;
                    commentInDB.author.username = request.user.username;
                    commentInDB.save();
                    campgroundInDB.comments.push(commentInDB);
                    campgroundInDB.save();
                    console.log(commentInDB);
                    response.redirect("/campgrounds/" + campgroundInDB._id);
                }
            })
        }
    })
});

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect("/login");
    }
}

module.exports = router;