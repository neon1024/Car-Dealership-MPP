const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                //console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(400).send("You need to be logged in to do this");
    }
}

// check current user 
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.currentUser = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.currentUser = user;
                next();
            }
        });
    } else {
        res.locals.currentUser = null;
        next();
    }
}


module.exports.isOwner = async (req, res, next) => {
    const {id} = req.params;
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(400).send(err.message);
            } else {
                if (id === decodedToken.id) {
                    next();
                } else {
                    res.status(403).send("You do not have permission to access that!");
                }
            }
        });
    } else {
        res.status(400).send("You need to be logged in to do this");
    }
}