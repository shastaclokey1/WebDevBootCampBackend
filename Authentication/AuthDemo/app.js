var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/auth_demo_app", { useNewUrlParser: true });

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*-----------------Routes-----------------*/

//

app.get("/", function(request, response) {
    response.render("home");
});

app.get("/secret", isLoggedIn, function(request, response) {
    response.render("secret");
});

// Auth Routes

app.get("/register", function(request, response) {
    response.render("register");
});

app.post("/register", function(request, response) {
    User.register(new User({username: request.body.username}), request.body.password, function(err, user) {
        if (err) {
            console.log(err);
            response.render("register");
        } else {
            passport.authenticate("local")(request, response, function() {
                response.redirect("/secret");
            });
        }
    });
});

app.get("/login", function(request, response) {
    response.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(request, response) {
    
});

app.get("/logout", function(request, response) {
    request.logout();
    response.redirect("/");
});


function isLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect("/login");
    }
}


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started......");
});