const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//schema for new design board note

const noteSchema = new Schema({
    username: {type: String},
    description: {type:String, required:true},
    submittime: {type: String},
    date: {type:Date}
}, {
    timestamps: true,
}); 

const StickyNote = mongoose.model('Sticky Note', noteSchema);

module.exports = StickyNote;