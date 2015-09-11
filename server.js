// modules
var express						= require('express');
var app							= express();
var bodyParser					= require('body-parser');
var methodOverride				= require('method-override');

// configuration
// DB config file
var db = require('./config/db');
// set our port
var port = process.env.PORT || 8181;

// connect to mongoDB database
//mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
// parse applicationn/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes
//require('./app/routes')(app);

// start app
app.listen(port);
// Shotout on the console
console.log('See stuff on port ' + port);
// expose app
exports = module.exports = app;
