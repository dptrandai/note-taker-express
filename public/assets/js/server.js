//importexpress and path
const express = require("express");
const path = require("path");

//setting up the server port and app
const app = express();
const PORT = process.env.PORT || 8080;

//data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//our server's storage for notes
let notes = [];

//initialize routing
//get the home page for a blank route
app.get("/", function(req, res){
    res.sendFile(`${process.cwd()}/public/index.html`);
});

//display the notes html
app.get("/notes", function(req, res){
    res.sendFile(`${process.cwd()}/public/notes.html`);
});
//give back requested notes in json object notation
app.get("/api/notes", function(req, res){
    console.log("Notes returned");
    return res.json(notes);
});

//save new note with the post command
app.post("/api/notes", function(req, res){
    const newNote = req.body;
    newNote.id = notes.length + 1;

    //add the note to the server's data
    notes.push(newNote);

    res.json(newNote);
    console.log(req.body);
    console.log("new note saved");
});

//delete notes from the server 
app.delete("/api/notes/:id", function(req, res){

    notes.splice((req.params.id - 1), 1);

    //refresh the ids of the notes
    for(let i = 0; i < notes.length; i++){
        notes[i].id = i +1;
    }

    console.log("removed id " + req.params.id);
    return res.json(notes);
});

//starting the server and having it listen on the correct port
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});