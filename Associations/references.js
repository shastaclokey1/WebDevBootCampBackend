var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/embedded_data_demo_2", { useNewUrlParser: true });

var Post = require("./models/post");

var User = require("./models/user");


// Post.create(
//     {
//         title: "How to cook the best burger pt. 4s",
//         content: "bob is a boss he is a really big boss"
//     },
//     function(err, post) {
//         User.findOne({email: "bob@faceTown.com"}, function(err, foundUser) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function(err, userInDBAfterCommentAdded) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log(userInDBAfterCommentAdded);
//                     }
//                 });
//             }
//         });
//     }
// );

User.findOne({email: "bob@faceTown.com"}).populate("posts").exec(function(err, userInDB) {
    if (err) {
        console.log(err);
    } else {
        console.log(userInDB);
    }
});