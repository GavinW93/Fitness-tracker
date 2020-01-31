
// placeholder
var express = require("express");
var path = require("path");
// Set Handlebars.

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static(path.join(__dirname, "/public")));
// Routes

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public","index.html"));
});

app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "public","exercise.html"));
  });

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + `http://localhost:${PORT}/`);
  console.log("this is working");
});
