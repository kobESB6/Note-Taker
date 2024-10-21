const router = require('express').Router();
const storedNotes = require('../db/note.js');

//GET route for retrieving all notes
router.get('/notes', (req, res) => {

    //class instance of the storedNotes
 storedNotes
     .getNotes()
     .then((notes) => {
        return res.json(notes);
    })
        .catch((err) => {
        res.status(500).json(err);
    });
});
//POST route for adding new notes
router.post('/notes', (req, res) => {
    storedNotes
    .addNotes(req.body)
    .then((note) => [res.json(note)])
    .catch((err) => res.status(500).json(err));
});
//DELETE route for deleting notes
router.delete('/notes/:id', (req, res) => {
    storedNotes
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});
//Exporting the router
module.exports = router;