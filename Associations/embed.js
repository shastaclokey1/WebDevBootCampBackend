var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/embedded_data_demo", { useNewUrlParser: true });

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding. Go to potions class to learn it!"
// });

// newUser.save(function(err, userInDB) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(userInDB)
//     }
// });

// var newPost = new Post({
//     title: "I found the moon!",
//     content: "I bla fla blue"
// });

// newPost.save(function(err, postInDB) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(postInDB)
//     }
// });


User.findOne({name: "Hermione Granger"}, function(err, userInDB) {
    if (err) {
        console.log(err);
    } else {
        userInDB.posts.push({
            title: "Three things I really hate",
            content: "Voldemort. Voldemort. Voldemort."
        });
        userInDB.save(function(err, userInDB) {
            if (err) {
                console.log(err);
            } else {
                console.log(userInDB);
            }
        })
    }
});