var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(request, response){
    response.render("landing")
});

router.get("/register", function(request, response) {
    response.render("register");
});

router.post("/register", function(request, response) {
    var newUser = new User({username: request.body.username});
    User.register(newUser, request.body.password, function(err, createdUser) {
        if (err) {
            console.log(err);
            response.render("register");
        } else {
            passport.authenticate("local")(request, response, function() {
                response.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(request, response) {
    response.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(request, response) {

});

router.get("/logout", function(request, response) {
    request.logout();
    response.redirect("/campgrounds");
});

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect("/login");
    }
}

module.exports = router;