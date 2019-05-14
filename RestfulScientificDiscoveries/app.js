var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_scientific_discoveries", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var discoverySchema = new mongoose.Schema({
    title: String,
    image: String,
    discoverer: String,
    yearDiscovered: String,
    description: String
});
var Discovery = mongoose.model("Discovery", discoverySchema);

app.get("/", function(request, response) {
    response.redirect("/discoveries");
});

app.get("/discoveries", function(request, response) {
    Discovery.find({}, function(err, discoveries) {
        if (err) {
            console.log(err);
            response.send(err);
        } else {
            response.render("index", {discoveries: discoveries});
        }
    });
});

app.get("/discoveries/new", function(request, response) {
    response.render("new");
});

app.post("/discoveries", function(request, response) {
    request.body.discovery.description = request.sanitize(request.body.discovery.description);
    Discovery.create(request.body.discovery, function(err, newBlog) {
        if (err) {
            response.render("new");
        } else {
            response.redirect("/discoveries");
        }
    });
});

app.get("/discoveries/:id", function(request, response) {
    Discovery.findById(request.params.id, function(err, foundDiscovery) {
        if (err) {
            response.redirect("/discoveries");
        } else {
            response.render("show", {discovery: foundDiscovery});
        }
    });
});

app.get("/discoveries/:id/edit", function(request, response) {
    Discovery.findById(request.params.id, function(err, foundDiscovery) {
        if (err) {
            response.redirect("/discoveries");
        } else {
            response.render("edit", {discovery: foundDiscovery});
        }
    });
});

app.put("/discoveries/:id", function(request, response) {
    request.body.discovery.description = request.sanitize(request.body.discovery.description);
    Discovery.findByIdAndUpdate(request.params.id, request.body.discovery, function(err, foundDiscovery) {
        if (err) {
            response.redirect("/discoveries");
        } else {
            response.redirect("/discoveries/" + request.params.id);
        }
    });
});

app.delete("/discoveries/:id", function(request, response) {
    Discovery.findByIdAndRemove(request.params.id, function(err) {
        if (err) {
            response.redirect("/discoveries");
        } else {
            response.redirect("/discoveries");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running (Let the science begin)");
});