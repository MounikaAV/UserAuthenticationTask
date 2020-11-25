const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('../config/config.json')
var mysqlLib = require('../config/mysqlLib');
const { response } = require('express');

router.post('/login', async (req, res) => {
    const user_name = req.body.user_name
    const password = req.body.password
    mysqlLib.getConnection(function (err, mclient) {
        var sql = `SELECT user_id, user_name, first_name, last_name, password FROM Users WHERE user_name = \'${req.body.user_name}\'`
        mclient.query(sql, function (err, rows) {
            if (err) throw err;
            else if (rows.length <= 0) res.status(404).json({ message: 'Please enter valid credentials' })
            else {
                console.log("Fetched User");
                const userInfo = rows[0]
                const validatedPassword = bcrypt.compareSync(password, userInfo.password);
                console.log('Validating Password')
                if (!validatedPassword) {
                    console.log('Validation Failed')
                    res.status(404).json({ message: 'Please enter valid Password' })
                }
                else {
                    console.log('Pasword Validation Successfull')
                    delete userInfo['password']
                    let loggedInUser = {
                        "user_id": userInfo.user_id,
                        "user_name": user_name,
                        "password": password
                    }
                    const token = jwt.sign(loggedInUser, config.secret, { expiresIn: config.tokenLife })
                    const refreshToken = jwt.sign(loggedInUser, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
                    const response = {
                        message: 'LoggedIn Successfully',
                        userData: userInfo,
                        "token": token,
                        "refreshToken": refreshToken,
                    };
                    res.status(200).json(response);
                }
            }
        });
    });
})

router.post('/register', async (req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    mysqlLib.getConnection(function (err, mclient) {
        var sql = `INSERT INTO Users (first_name, last_name, user_name, password) 
    VALUES (\'${req.body.first_name}\', \'${req.body.last_name}\', \'${req.body.user_name}'\, \'${hashedPassword}'\);`
        mclient.query(sql, function (err, result) {
            if (err) throw err;
            console.log("record inserted");
        });
    });
    const response = { message: 'Successfully Registered' }
    res.status(200).json(response);
})

router.post('/token', async (req, res) => {
    const postData = req.body
    if (!postData.refreshToken) {
        return res.status(404).json({ message: 'Please provid refresh token' })
    }
    const decoded = await jwt.verify(postData.refreshToken, config.refreshTokenSecret);

    const refreshuser = {
        "user_id": userInfo.user_id,
        "user_name": decoded.user_name,
        "password": decoded.password
    }
    const token = jwt.sign(refreshuser, config.secret, { expiresIn: config.tokenLife })
    const response = {
        "token": token,
    }
    res.status(200).json(response);
})

module.exports = router;