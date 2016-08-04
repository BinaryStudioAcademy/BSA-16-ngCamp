var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var User = require('./userSchema');

var projectSchema = new Schema({
    title: String,
    description: String,
/*    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
*/
    startDate: Date,
    endDate: Date,
    version: String,
    repository: String
});

module.exports = mongoose.model('Project', projectSchema);