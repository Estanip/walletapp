const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(404).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = decoded.id;
    next();
    console.log(req.userId)
}

module.exports = { verifyToken };