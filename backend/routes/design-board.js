const router = require('express').Router();
let StickyNote = require('../models/sticky-note-schema');


router.get('/', (req, res) => {
    StickyNote.find()
        .then(note => res.json(note))
        .catch(err => res.status(400).json("Error: " + err));
});
 
//create new sticky note board item
router.post('/add', (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const submittime = req.body.submittime;
    const date = Date.parse(req.body.date);

    const newNote = new StickyNote({
        username,
        description,
        submittime,
        date,
    });

    newNote.save()
        .then(() => res.json('Note Added!'))
        .catch(err => res.status(400).json("Error: " + err))
});

router.get('/:id', (req, res) => {
    StickyNote.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json("Error: " + err))
});

//remove an existing board item
router.delete('/:id', (req, res) => {
    StickyNote.findByIdAndDelete(req.params.id)
        .then(() => res.json("Note deleted."))
        .catch(err => res.status(400).json("Error: " + err))
});

//set up for editing notes 
router.post('/update/:id', (req, res) => {
    StickyNote.findById(req.params.id)
        .then(note => {
            note.username = req.body.username;
            note.description = req.body.description;
            note.submittime = req.body.submittime;
            note.date = Date.parse(req.body.date)

            note.save()
                .then(() => res.json("Note updated"))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
});

module.exports = router; 