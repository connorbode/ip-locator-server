var express = require('express');
var app = express();
var models = require('./models');

//
// runApp
// ------
//
// This method starts the express server
//
var runApp = function () {
  console.log('connected to db');
};

//
// dbFailed
// --------
//
// This method runs if the application
// fails to connect to the database.
//
var dbFailed = function (err) {
  console.log('failed to connect to db');
  console.log(err);
};

// connect to db
models.sequelize.sync().then(runApp).catch(dbFailed);