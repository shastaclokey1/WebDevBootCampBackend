var middlewareObject = {};
var Comment = require("../models/comment");
var Campground = require("../models/campground");

middlewareObject.isLoggedIn = function(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect("/login");
    }
}

middlewareObject.checkCommentOwnership = function(request, response, next) {
    if (request.isAuthenticated()) {
        Comment.findById(request.params.comment_id, function(err, commentInDB) {
            if (err) {
                response.redirect("back");
            } else {
                if (commentInDB.author.id.equals(request.user._id)) {
                    next();
                } else {
                    response.redirect("back");
                }
            }
       });
    } else {
        response.redirect("back");
    }
}

middlewareObject.checkCampgroundOwnership = function(request, response, next) {
    if (request.isAuthenticated()) {
        Campground.findById(request.params.id, function(err, campgroundInDB) {
            if (err) {
                response.redirect("back");
            } else {
                if (campgroundInDB.author.id.equals(request.user._id)) {
                    next();
                } else {
                    response.redirect("back");
                }
            }
    });
    } else {
        response.redirect("back");
    }
}


module.exports = middlewareObject;