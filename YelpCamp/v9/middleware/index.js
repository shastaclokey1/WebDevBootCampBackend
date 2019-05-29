var middlewareObject = {};
var Comment = require("../models/comment");
var Campground = require("../models/campground");

middlewareObject.isLoggedIn = function(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        request.flash("error", "You need to be logged in to do that");
        response.redirect("/login");
    }
}

middlewareObject.checkCommentOwnership = function(request, response, next) {
    if (request.isAuthenticated()) {
        Comment.findById(request.params.comment_id, function(err, commentInDB) {
            if (err) {
                request.flash("error", "Something went wrong");
                response.redirect("back");
            } else {
                if (commentInDB.author.id.equals(request.user._id)) {
                    next();
                } else {
                    request.flash("error", "You don't have permission to do that");
                    response.redirect("back");
                }
            }
       });
    } else {
        request.flash("error", "You need to be logged in to do that");
        response.redirect("back");
    }
}

middlewareObject.checkCampgroundOwnership = function(request, response, next) {
    if (request.isAuthenticated()) {
        Campground.findById(request.params.id, function(err, campgroundInDB) {
            if (err) {
                request.flash("error", "Something went wrong");
                response.redirect("back");
            } else {
                if (campgroundInDB.author.id.equals(request.user._id)) {
                    next();
                } else {
                    request.flash("error", "You don't have permission to do that");
                    response.redirect("back");
                }
            }
    });
    } else {
        request.flash("error", "You need to be logged in to do that");
        response.redirect("back");
    }
}


module.exports = middlewareObject;