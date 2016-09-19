var async = require('async'),
    jsonwebtoken = require('jsonwebtoken'),
    http = require('http'),
    tokenSecret = require('../config/token').secret,
    Cookies = require('cookies'),
    userRepository = require('../repositories/userRepository'),
    userService = require('../services/userService');

module.exports = function (req, res, next) {
    var cookies = new Cookies(req, res),
        token = cookies.get('x-access-token');
    // getReadyForCreateUser = getReadyForCreateUser;

    if (req.session.user) {
        var id = req.session.user._id;
        userRepository.getById(id, function (err, data) {
            req.session.user = data;
            next();
        });
    } else {
        if (token) {
            async.waterfall([
                function verifyToken(callback) {
                    jsonwebtoken.verify(token, tokenSecret, callback);
                },
                function getUserFromAuth(decoded, callback) {
                    var reqData = {
                        method: 'GET',
                        host: 'team.binary-studio.com',
                        path: '/profile/user/getByCentralId/' + decoded.id,
                    }
                    var request = http.request(reqData, function (response) {
                        var user = '';

                        response.setEncoding('utf8');
                        response.on('data', function (chunk) {
                            user += chunk;
                            console.log('\n\n\nCHUNK: ', chunk);
                        });
                        response.on('end', function () {
                            console.log('\n\n\n USER: ', user);
                            user = JSON.parse(user);
                            console.log('\n\n\n USER JSON: ', user[0]);
                            callback(null, user);
                        });
                    });
                    request.end();
                },
                function logIn(user, callback) {
                    var email = user.email,
                        avatar = {
                            real: user.avatar.urlAva,
                            small: user.avatar.thumbnailUrlAva
                        };
                    userRepository.getUserByEmail(email, function (err, data) {
                        if (data) {
                            req.session.user = data;
                            if (!data.avatar || !data.avatar.real || data.avatar.real !== avatar.real || !data.avatar.small || data.avatar.small !== avatar.small) {
                                userRepository.setnewAvatar(email, avatar, function (err, data) {
                                    next();
                                });
                            }
                        } else {
                            var userData = getReadyForCreateUser(email);
                            userService.addItem(userData, function (err, data) {
                                req.session.user = data;
                                next();
                            });
                        }
                        // next();
                    });
                }
            ], function (err, result) {
                if (err) {
                    res.status(403).send({
                        success: false,
                        message: "Failed to authenticate user"
                    });
                } else {
                    callback(null, result);
                }
            });

        } else {
            res.redirect('http://team.binary-studio.com/auth/#/')
        }
    }

    function getReadyForCreateUser(email, avatar) {
        var fullName = email.substring(0, email.indexOf('@')),
            preparedData = {
                email: email,
                avatar: avatar
            };

        if (fullName.indexOf('.') !== -1) {
            var tmpName = fullName.split('.');
            preparedData.firstName = tmpName[0];
            preparedData.lastName = tmpName[1];
        } else {
            preparedData.firstName = fullName;
            preparedData.lastName = 'UnknownSurname';
        }

        return preparedData;

    }

};