const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

//References a helper file that does the heavy lifting of CRUD operations
//in the file system.
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

//Declare it once. Use it for everything.
const dbDestination = './db/db.json';

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile(dbDestination).then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { id, title, text } = req.body;

  if (req.body) {
    const newNote = {
      id: uuidv4(),
      title,
      text
    };

    readAndAppend(newNote, dbDestination);
    res.json(`Note added successfully`);
  } else {
    res.error('Note not created');
  }
});

notes.delete('/:id', function(req, res) {
  // Gets id number of note to delete
  const noteId = req.params.id;
  
  readFromFile(dbDestination)
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.id != noteId);
      
      // Save that array to the filesystem
      writeToFile(dbDestination, result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted ???`);
    });
});

module.exports = notes;
