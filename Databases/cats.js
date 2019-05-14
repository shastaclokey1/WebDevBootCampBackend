var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//     name: "Mr. Fiddles",
//     age: 2,
//     temperament: "Playful"
// });

// george.save(function(err, catInDB){
//     if (err) {
//         console.log("Something Went Wrong");
//     } else {
//         console.log("Successfully saved cat to db");
//         console.log(catInDB);
//     }
// });

Cat.create({
    name: "bloooooooop",
    age: 12,
    temperament: "bland"
}, function(err, catInDb) {
    if (err) {
        console.log("OH NO, ERROR!");
        console.log(err);
    } else {
        console.log("cat added to db");
        console.log(catInDb);
    }
});

Cat.find({}, function(err, catsInDb) {
    if (err) {
        console.log("OH NO, ERROR!");
        console.log(err);
    } else {
        console.log("all the cats");
        console.log(catsInDb);
    }
});