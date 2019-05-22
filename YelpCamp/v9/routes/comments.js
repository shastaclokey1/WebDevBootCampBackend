var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Middleware = require("../middleware/");

router.get("/new", Middleware.isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campgroundInDB) {
        if (err) {
            console.log(err);
        } else {
            response.render("comments/new", {campground: campgroundInDB});
        }
    });
});

router.post("/", Middleware.isLoggedIn, function(request, response) {
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

router.get("/:comment_id/edit", Middleware.checkCommentOwnership, function(request, response) {
    Comment.findById(request.params.comment_id, function(err, commentInDB) {
        if (err) {
            response.redirect("back");
        } else {
            response.render("comments/edit", {campgroundID: request.params.id, comment: commentInDB});
        }
    });
});

router.put("/:comment_id", Middleware.checkCommentOwnership, function(request, response) {
    Comment.findByIdAndUpdate(request.params.comment_id, request.body.comment, function(err, commentInDB) {
        if (err) {
            response.redirect("back");
        } else {
            response.redirect("/campgrounds/" + request.params.id);
        }
    });
});

router.delete("/:comment_id", Middleware.checkCommentOwnership, function(request, response) {
    Comment.findByIdAndRemove(request.params.comment_id, function(err) {
        if (err) {
            response.redirect("back");
        } else {
            response.redirect("/campgrounds/" + request.params.id);
        }
    })
});

module.exports = router;