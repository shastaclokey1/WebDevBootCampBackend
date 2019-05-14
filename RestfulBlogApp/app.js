var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE SCHEMA/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//ROUTES
app.get("/", function(request, response) {
    response.redirect("/blogs");
});

app.get("/blogs", function(request, response){
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            response.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", function(request, response) {
    response.render("new");
});

app.post("/blogs", function(request, response) {
    request.body.blog.body = request.sanitize(request.body.blog.body);
    Blog.create(request.body.blog, function(err, newBlog) {
        if (err) {
            response.render("new");
        } else {
            response.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(request, response) {
    Blog.findById(request.params.id, function(err, foundBlog){
        if (err) {
            response.redirect("/blogs");
        } else {
            response.render("show", {blog: foundBlog});
        }
    });
});

app.get("/blogs/:id/edit", function(request, response) {
    Blog.findById(request.params.id, function(err, foundBlog) {
        if (err) {
            response.redirect("/blogs");
        } else {
            response.render("edit", {blog: foundBlog});
        }
    });
});

app.put("/blogs/:id", function(request, response) {
    request.body.blog.body = request.sanitize(request.body.blog.body);
    Blog.findByIdAndUpdate(request.params.id, request.body.blog, function(err, updatedBlog) {
        if (err) {
            response.redirect("/blogs");
        } else {
            response.redirect("/blogs/" + request.params.id);
        }
    });
});

app.delete("/blogs/:id", function(request, response) {
    Blog.findByIdAndRemove(request.params.id, function(err) {
        if (err) {
            response.redirect("/blogs");
        } else {
            response.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});