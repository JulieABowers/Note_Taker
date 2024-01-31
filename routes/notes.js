const notes = require('express').Router();

//References a helper file that does the heavy lifting of CRUD operations
//in the file system.
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;
