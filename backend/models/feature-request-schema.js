const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//schema for new feature request (not in prod)

const featureSchema = new Schema({
    username: {type: String, required:true},
    description: {type:String, required:true},
    team: {type: String},
    submittime: {type: String},
    date: {type:Date}
}, {
    timestamps: true,
}); 

const FeatureRequest = mongoose.model('Feature Requests', featureSchema);

module.exports = FeatureRequest;