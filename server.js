
// placeholder
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const mongo = require('mongojs');
const path = require('path');
var express = require("express");
//var path = require("path");
// Set Handlebars.


const db = require("./models/index.js");

const app = express();



var PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
// Static directory to be served
app.use(express.static(path.join(__dirname, "/public")));
// Routes


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true });






app.get("/api/workouts", (req,res)=>{
db.Workout.find({},(err,data)=>{
  if(err){
    res.status(500).send(err);
  }else{
    res.json(data);
    console.log("workout data: ", data);
  }
});
});

app.post("/api/workouts", (req,res)=>{
db.Workout.create({},(err,data)=>{
  if(err){
    res.status(500).send(err);
  }else{
    res.json(data);
  }
});
});







app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public","index.html"));
});

app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "public","exercise.html"));
  });



  app.put("/api/workouts/:id", (req,res)=>{
    let id = req.params.id;
    let exercise = req.body;
    db.Workout.updateOne({_id: mongo.ObjectID(id)},{$push:{exercises:exercise}},(err,data)=>{
      if(err){
        res.status(500).send(err.message);
      }else{
        res.json(data);
      }
    });
  });








  app.get("/stats", (req,res)=>{
    res.sendFile(path.join(__dirname+"/public/stats.html"));
  });


  app.get("/api/workouts/range", (req,res)=>{
    db.Workout.find({}, (err,data)=>{
      res.json(data);
    });
  });
  
  //HTML Route to go to stats page
  app.get("/stats", (req,res)=>{
    res.sendFile(path.join(__dirname+"/public/stats.html"));
  });





// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + `http://localhost:${PORT}/`);
  console.log("this is working");
});
