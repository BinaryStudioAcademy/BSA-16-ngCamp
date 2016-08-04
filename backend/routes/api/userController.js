var router = require('express').Router();
var apiResponse = require('express-api-response');
var userService = require('../../services/userService');
var userRepository = require('../../repositories/UserRepository');

router.get('/', function (req, res, next) {
    userRepository.getAll(function (err, data) {
        for (var i = 0; i < data.length; i++) {
            data[i] = data[i].toObject();
        }
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.get('/:id', function (req, res, next) {
    userRepository.getById(req.params.id, function (err, data) {       
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.post('/', function (req, res, next) {
    userService.addItem(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.put('/', function (req, res, next) {
    userService.updateItem(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.delete('/:id', function (req, res, next) {
    userRepository.deleteById(req.params.id, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

module.exports = router;
