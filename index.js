//Importing modules and initializing Express
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        logger = require('morgan'),
        mongoose = require('mongoose'),
        router = require('./router'),
				passport = require('passport'),
        config = require('./config/main');

//Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
console.log('The server is running on port ' + config.port + '.');

//Setting up basic middleware for all Express requests
app.use(logger('dev')); //Log requests to API using morgan (que carajo es morgan?)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Enable CORS from client-side
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

//Database connection
mongoose.connect(config.database);

app.use(passport.initialize());
app.use(passport.session());

//Add routes to Express app
router(app);

