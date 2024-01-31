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
module.exports = notes;
