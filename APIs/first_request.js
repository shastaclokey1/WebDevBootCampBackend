var request = require("request");
request("https://jsonplaceholder.typicode.com/users", function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        console.log(`${parsedData[0].name} lives on ${parsedData[0].address.street} street in ${parsedData[0].address.city}`);
    } else {
        console.log("Something went wrong");
        console.log(error);
    }
});