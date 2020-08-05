const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//schema for live meeting feedback comments

const feedbackSchema = new Schema({
    feedback: {type: String, required:true},
}, {
    timestamps: true,
}); 

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;