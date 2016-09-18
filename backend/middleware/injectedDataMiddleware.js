var fs = require('fs'),
    replaceStream = require('replacestream');

module.exports = function (req, res, obj, error) {
    error = error || false;

    populateInjectData(req.user, function (data) {
        if (req.session && req.session.user) {
            obj.isLoggedIn = true;
            obj.userId = req.session.user._id;
            obj.userFirstName = req.session.user.firstName;
            obj.userLastName = req.session.user.lastName;
            obj.role = req.session.user.role;
            obj.currentProject = req.session.user.currentProject;
        }

        res.header = ('Content-Type', 'text/html');
        fs.createReadStream(__dirname + '/../../public/' + '_index.html')
            .pipe(replaceStream("[\"data_replace\"]", JSON.stringify(obj).replace(/'/g, "\\'").replace(/\\\"/g, "\\\\\"")))
            .pipe(replaceStream("window._is404Error = false;", "window._is404Error = " + error + ";"))
            .pipe(res);
    });

    function populateInjectData(user, callback_main) {
        callback_main(null, null);
    }
};