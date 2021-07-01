const User = require('../model/Users');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res) => {
    try {
        const results = await User.findAll({
            where: {
                username: req.body.username
            },
        })

        if (results.length > 0) {
            res.send(JSON.stringify({ "status": 302, "error": "User alredy exist" }))
            return;
        };

        const username = req.body.username;
        const password = await bcryp.hash(req.body.password, 12);
        console.log(password);
        const newUser = await User.create({
            username,
            password
        })
        const token = jwt.sign(
            { username: newUser.username, id: newUser.id },
            process.env.SECRET_KEY,
            {
                expiresIn: "5m",
            });
        return res.send(JSON.stringify({ "status": 200, "error": null, "message": "User Created Succesfully", "response": newUser, "token": token }));
    } catch (err) {
        console.log(`Query error ${err}`)
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const results = await User.findAll({
            where: {
                username
            }
        })
        if (results.length == 0) {
            res.send(JSON.stringify({ "status": 404, "error": "User does not exist", "token": null }))
            return;
        }

        // PASS VALIDATION

        const validPass = await bcryp.compare(password, results[0].password);
        if (!validPass) {
            res.send(JSON.stringify({ "status": 406, "error": "Wrong Password", "token": null }));
            return;
        }
        const token = jwt.sign(
            { username: results[0].username, id: results[0].id },
            process.env.SECRET_KEY,
            {
                expiresIn: "5m"
            });
        return res.status(201).json({ token, username: results[0].username, id: results[0].id })
    } catch (err) {
        console.log(`Query error ${err}`)
    }
}

module.exports = { createUser, loginUser };