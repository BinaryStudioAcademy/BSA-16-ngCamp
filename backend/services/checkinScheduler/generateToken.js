var randomToken = require('random-token');
var tokens = require('./tokens');

function getUniqueToken(){
    var token = randomToken(16);

    for (i = 0; i < 5; i++) {
        if (!tokens.has(token)) {
            tokens.add(token);
            break;
            }
        }
    return token
}

module.exports = getUniqueToken;

