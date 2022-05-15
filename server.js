const express = require('express');
const path = require('path');
let noteData = require('./Develop/db/db.json');
const PORT = 5500;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
})

app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/assets/css/styles.css'));
})

app.get("/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/assets/js/index.js'));
})

app.get('/api/notes', (req, res) => {
   return res.json(noteData);
});

app.post("/api/notes", (req, res) => {
    const body = req.body;
    noteData.push(body);
    return res.json("data is saved successfully");
});

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    console.log("id: ", id);
    noteData = noteData.filter((data, idx) => idx !== id);
    return res.json("data is deleted successfully");
})

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
