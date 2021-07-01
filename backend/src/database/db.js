const { Sequelize } = require('sequelize');
require('dotenv').config();

/* DB CONFIG */

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: 3306
    }
);

/* DB INIT */

database.sync();


/* DB AUTHENTICATE */

const dbConnect = async () => {
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

dbConnect();

module.exports = database;
