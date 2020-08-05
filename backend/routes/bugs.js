const router = require('express').Router();
let Bug = require('../models/bug-report-schema');

router.get('/', (req, res) => {
    Bug.find()
        .then(bug => res.json(bug))
        .catch(err => res.status(400).json("Error: " + err));
});

//add new bug
router.post('/add', (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const assignedto = req.body.assignedto;
    const submittime = req.body.submittime;
    const date = Date.parse(req.body.date);

    const newBug = new Bug({
        username,
        description,
        assignedto,
        submittime,
        date,
    });

    newBug.save()
        .then(() => res.json('Bug Report Added!'))
        .catch(error => res.status(400).json("Error: " + error))
});

router.get('/:id', (req, res) => {
    Bug.findById(req.params.id)
        .then(bug => res.json(bug))
        .catch(err => res.status(400).json("Error: " + err))
});

//remove bug 
router.delete('/:id', (req, res) => {
    Bug.findByIdAndDelete(req.params.id)
        .then(() => res.json("Bug Report deleted."))
        .catch(err => res.status(400).json("Error: " + err))
});


//edit bug report 
router.post('/update/:id', (req, res) => {
    Bug.findById(req.params.id)
        .then(bug => {
            bug.username = req.body.username;
            bug.description = req.body.description;
            bug.assignedto = req.body.assignedto;
            bug.submittime = req.body.submittime;
            bug.date = Date.parse(req.body.date)

            bug.save()
                .then(() => res.json("Bug updated"))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
});



module.exports = router;  