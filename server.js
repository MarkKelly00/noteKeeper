const express = require("express");
const fs = require("fs");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public')); //allows access to all folders *CSS/HTML/JS* to run on browser

app.get('/notes', function (req,res) {
    res.sendFile(__dirname+"/public/notes.html")
});

app.get('/api/notes', function (req, res) {
    res.sendFile(__dirname+"/db/db.json")
});

app.get('*', function (req, res) {
    res.sendFile(__dirname+"/public/index.html")
});

app.post('/api/notes', function (req, res) {
    var newNote = req.body;
    var notes = fs.readFileSync(__dirname + '/db/db.json');
    notes = JSON.parse(notes);
    newNote.id = String(notes.length);

    notes.push(newNote);
    fs.writeFileSync(__dirname+"/db/db.json", JSON.stringify(notes));
    res.json(notes);
});

app.delete('/api/notes/:id', function(req, res) {
    const noteId = req.params.id; // string
    var notes = fs.readFileSync(__dirname + '/db/db.json');
    notes = JSON.parse(notes);
    const deleteNotes = notes.filter(item => item.id != req.params.id);
    fs.writeFileSync(__dirname+"/db/db.json", JSON.stringify(deleteNotes));
    res.json(deleteNotes);
});

app.listen(port, () => console.log(`App listening on http://localhost.${port}`));

