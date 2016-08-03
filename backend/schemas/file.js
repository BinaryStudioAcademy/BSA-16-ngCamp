var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileScema = new Schema({
    url: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    creationDate: {
        type: Date
    },
    allowedTo: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

module.exports = mongoose.model('file', fileSchema);