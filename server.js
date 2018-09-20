// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// Set up port to be either the hos'ts designated port, or 3000
var PORT = process.env.PORT || 3000;

// Instantiate Express App
var app = express();

// Setup an Express Router
var router = express.Router();

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Have every request go through our router middleware
app.use(router);

// If deployed, use the deployed database.  Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to our database
mongoose.connect(db, function(error){
    // Log any errors connecting with mongoose
    if (error){
        console.log(error);
    }
    // Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});


// Listen on the port
app.listen(PORT, function(){
    console.log("Listening on port:" + PORT);
});