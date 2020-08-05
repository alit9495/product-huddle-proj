const router = require('express').Router();
let Message = require('../models/feedback-schema'); 
const Feedback = require('../models/feedback-schema');

router.get('/', (req, res) => {
    Message.find()
        .then(messages => res.json(messages))
        .catch(err => res.status(400).json("Error: " + err));
});

//route for adding new comments
router.post('/add', (req, res) => {
    const feedback = req.body.feedback;

    const newFeedback = new Feedback({
        feedback,
    });
 
    newFeedback.save()
        .then(() => res.json('Feedback Added!'))
        .catch(err => res.status(400).json("Error: " + err))
});

router.get('/:id', (req, res) => {
    Message.findById(req.params.id)
        .then(message => res.json(message))
        .catch(err => res.status(400).json("Error: " + err))
});

//delete comments
router.delete('/:id', (req, res) => {
    Message.findByIdAndDelete(req.params.id)
        .then(() => res.json("Note deleted."))
        .catch(err => res.status(400).json("Error: " + err))
});




module.exports = router
