const router = require('express').Router();
let User = require('../models/user-schema');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
})
 
//add users
router.post('/add', (req, res) => {
    const username = req.body.username;
    const role = req.body.role;

    const newUser = new User({username, role});

    newUser.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
})



module.exports = router;