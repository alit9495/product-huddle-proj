const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//schema to create new team member

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
    }, 
}, {
    timestamps: true,
}); 

const User = mongoose.model('User', userSchema);

module.exports = User;