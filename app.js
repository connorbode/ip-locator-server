var express = require('express');
var app = express();
var models = require('./models');

//
// register 
// --------
//
// This method registers a machine
// for the service.
//
var register = function (req, res) {

};

//
// identify
// --------
//
// This method allows a machine to
// identify its location.
//
var identify = function (req, res) {

};

//
// locate
// ------
//
// This method returns the location
// of a machine.
//
var locate = function (req, res) {

};

//
// runApp
// ------
//
// This method starts the express server
//
var runApp = function () {
  app.listen(3000);
  console.log('server running');
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

app.post('/machines', register);
app.put('/machines/:key', identify);
app.get('/machines/:key', locate);

models.sequelize.sync().then(runApp).catch(dbFailed);