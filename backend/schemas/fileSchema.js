var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    url: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    creationDate: Date,
    allowedTo: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('File', FileSchema);