var express = require("express");
var app = express();
var requestAPI = require("request");
app.set("view engine", "ejs");

app.get("/", function(request, response) {
    response.render("search");
});

app.get("/results", function(request, response){
    var query = request.query.searchTerm;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    requestAPI(url, function(error, apiResponse, body) {
        if (!error && apiResponse.statusCode == 200) {
            var parsedData = JSON.parse(body);
            response.render("results", {data: parsedData});
        } else {
            console.log("Something went wrong");
            console.log(error);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server for Movie App has started!");
});