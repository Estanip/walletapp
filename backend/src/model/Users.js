const Sequelize = require('sequelize');
const sequelize = require('../database/db');

/* USER MODEL */

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
},
    {
        timestamps: false
    }
)

module.exports = User;