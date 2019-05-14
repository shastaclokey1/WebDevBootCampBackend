var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var campgroundsData = [
        {
            name: "Cloud's Rest",
            image: "https://images.unsplash.com/photo-1524654458049-e36be0721fa2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description: "burgers on a mountain"
        },
        {
            name: "The Wandering Wood",
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "burgers on a mountain"
        },
        {
            name: "Swimming Hole",
            image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "burgers on a mountain"
        }
    ]

function seedDB() {
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("Removed all campgrounds!");
        campgroundsData.forEach(function(seed) {
            Campground.create(seed, function(err, campgroundInDB) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campgroundInDB.comments.push(comment);
                                campgroundInDB.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });    
}

module.exports = seedDB;