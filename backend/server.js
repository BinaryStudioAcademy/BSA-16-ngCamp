var bodyParser = require('body-parser'),
    context = require('./units/context'),
    express = require('express'),
    mongooseConnection = require('./db/dbConnect').connection,
    path = require('path'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    sessionSecret = require('./config/session').secret,
    mongoose = require('mongoose');
auth = require('./middleware/auth'),
    fileUpload = require('express-fileupload');

var scheduler = require('./services/checkinScheduler/checkinScheduler');

var app = express();

app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongooseConnection
    })
}));

app.use(auth);

context.mongoStore = new MongoStore({
    mongooseConnection: mongooseConnection
});

var staticPath = path.resolve(__dirname + '/../public');
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(fileUpload());
app.use(function (req, res, next) {
    //console.log(req.session.user);
    next();
});

var apiRoutes = require('./routes/api/routes')(app),
    viewRoutes = require('./routes/view/routes')(app);

var docs = require("express-mongoose-docs");

docs(app, mongoose);

var server = app.listen(3060);

module.exports = app;