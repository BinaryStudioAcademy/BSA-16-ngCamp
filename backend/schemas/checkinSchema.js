+var mongoose = require('mongoose');
+var Schema = mongoose.Schema;

var CheckinSchema = Schema({
    title: String,
    question: String,
    partisipants: [{
+        type: Schema.Types.ObjectId,
    +    ref: 'User'
+   }],
    frequency: String,
    answers: [{
         user: {
              type: Schema.Types.ObjectId,
              ref: 'User'
         },
         answer: String,
         creationDate: Date,
         editedDate: Date
    }]
});

+module.exports = mongoose.model('Checkin', CheckinSchema);