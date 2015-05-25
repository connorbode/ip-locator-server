'use strict';
module.exports = function(sequelize, DataTypes) {
  var Machine = sequelize.define('Machine', {
    key: DataTypes.STRING,
    secret: DataTypes.STRING,
    ip: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Machine;
};