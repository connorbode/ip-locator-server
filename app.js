var express = require('express');
var app = express();
var models = require('./models');
var crypto = require('crypto');
var bodyParser = require('body-parser');

//
// register 
// --------
//
// This method registers a machine
// for the service.
//
var register = function (req, res) {
  var key = crypto.randomBytes(16).toString('hex');
  var secret = crypto.randomBytes(16).toString('hex');
  models.Machine.create({ key: key, secret: secret })
    .then(function (machine) {
      res.status(201).json(machine).end();
    })
    .catch(function (err) {
      res.status(500).end();
    });
};

//
// identify
// --------
//
// This method allows a machine to
// identify its location.
//
var identify = function (req, res) {
  var key = req.param('key');
  var secret = req.body.secret;
  var ip = req.body.ip;
  models.Machine.findOne({ where: { key: key, secret: secret }})
    .then(function (machine) {
      if (!machine)
        throw { status: 404, message: 'Machine not found!' };

      return machine.update({ ip: ip });
    })
    .then(function (machine) {
      res.status(200).json(machine).end();
    })
    .catch(function (err) {
      if (res.status) return res.status(err.status).json(err).end();
      res.status(500).end();
    });
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

app.use(bodyParser.json());
app.post('/machines', register);
app.put('/machines/:key', identify);
app.get('/machines/:key', locate);

models.sequelize.sync().then(runApp).catch(dbFailed);