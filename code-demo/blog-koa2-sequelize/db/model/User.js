const Sequelize = require('sequelize')

const seq = require('../seq')

const User = seq.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    realname: {
      type: Sequelize.STRING
    }
  }
);


module.exports = User