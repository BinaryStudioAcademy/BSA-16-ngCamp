let req = require.context("./", true, /^(.*\.(js$))[^.]*$/igm);
req.keys().forEach(function(key){
    req(key);
});