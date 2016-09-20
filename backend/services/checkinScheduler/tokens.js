var checkinRepository = require('../../repositories/checkinRepository');
var mySet = new Set();


function getTokens() {
    if (mySet.length == 0) {
        checkinRepository.getAnswersById(id, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                data.forEach(function (answer) {
                    mySet.add(answer.token);
                })
            }
        })
    }
}

function clearTokens(){
    mySet.clear();
}

module.exports = {
    mySet,
    getTokens,
    clearTokens
}

