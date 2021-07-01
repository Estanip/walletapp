const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded } = require('express');


const app = express();

/* SETTINGS */
app.set('port', process.env.PORT || 3000);

/* MIDDLEWARES */
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

/* ROUTES */
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/users', require('./routes/users'));


module.exports = app;