var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var User = require("./models/user");

var app = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

/*-----------------------Passport Configuration---------------------*/
app.use(require("express-session")({
    secret: "Zilla wins the cutest cat in the universe",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(request, response, next) {
    response.locals.currentUser = request.user;
    next();
});


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
           response.render("campgrounds/index", {campgrounds: allCampgroundsInDB});
       }
    });
});

//CREATE - add campground to the DB
app.post("/campgrounds", isLoggedIn, function(request, response){
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
app.get("/campgrounds/new", isLoggedIn, function(request, response) {
    response.render("campgrounds/new");
});

//SHOW- Show campground specific info
app.get("/campgrounds/:id", function(request, response) {
    Campground.findById(request.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            response.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


/*-----------------------Comments Routes---------------------*/

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campgroundInDB) {
        if (err) {
            console.log(err);
        } else {
            response.render("comments/new", {campground: campgroundInDB});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campgroundInDB) {
        if (err) {
            console.log(err);
            response.redirect("/campgrounds");
        } else {
            Comment.create(request.body.comment, function(err, commentInDB) {
                if (err) {
                    console.log(err);
                } else {
                    campgroundInDB.comments.push(commentInDB);
                    campgroundInDB.save();
                    response.redirect("/campgrounds/" + campgroundInDB._id);
                }
            })
        }
    })
});


/*-----------------------Authentication Routes---------------------*/

app.get("/register", function(request, response) {
    response.render("register");
});

app.post("/register", function(request, response) {
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

app.get("/login", function(request, response) {
    response.render("login");
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(request, response) {

});

app.get("/logout", function(request, response) {
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


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started :)")
});