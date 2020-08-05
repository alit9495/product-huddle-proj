const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//schema for a new development bug 

const bugSchema = new Schema({
    username: {type: String},
    description: {type: String, required:true},
    assignedto: {type: String},
    submittime: {type: String},
    date: {type:Date, required:true}
}, {
    timestamps: true,
}); 

const BugReport = mongoose.model('Bug Report', bugSchema);

module.exports = BugReport;