const Sequelize = require('sequelize');
const sequelize = require('../database/db');

/* WALLET MODEL */

const Wallet = sequelize.define('wallet', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  concept: Sequelize.STRING,
  entrance: Sequelize.INTEGER,
  tentrance: Sequelize.STRING,
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  userId: {
    type: Sequelize.INTEGER
  }
},
  {
    timestamps: false
  }
);


module.exports = Wallet;