const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const users = require('../controllers/users.controller');
const middleware = require('../middleware/middleware');

router.route('/register')
    .post(users.register);

router.route('/login')
    .post(users.login);

router.get('/logout', users.logout);

router.get('/users/:id', middleware.isOwner, users.getUser);

router.get('/cookie', (req, res) => {
    try {
        const jwtCookie = req.cookies.jwt;
        if (jwtCookie) {
            jwt.verify(jwtCookie, process.env.SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(400).send("Could not get the jwt cookie");
                } else {
                    res.status(200).json(decodedToken);
                }
            });
        } else {
            res.status(400).send("Jwt cookie not found");
        }
    } catch (err) {
        console.error(err.message)
    }
});

router.get('/confirmation/:token', async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        const user = await User.findByIdAndUpdate(decodedToken.user, {confirmed: true});
        res.status(200).json({confirmed: true});
    } catch (err) {
        res.status(400).json({confirmed: false});
    }
});

module.exports = router;
