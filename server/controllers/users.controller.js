const User = require('../models/user');
const jwt = require('jsonwebtoken');

// mail verification
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const authCodes = {};
const generateRandomCode = () => {
    // Generate a random 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: maxAge
    });
}


module.exports.register =  async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = createToken(user._id);
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     maxAge: maxAge * 1000
        // });

        //async email
        jwt.sign(
            {user: user.id},
            process.env.EMAIL_SECRET,
            {expiresIn: '1d'},
            (err, emailToken) => {
                if (err) {
                    conseole.error("Error getting emailToken", error);
                }
                const url = `http://localhost:5173/confirmation/${emailToken}`;

                transporter.sendMail({
                    from: 'm43941931@gmail.com',
                    to: user.email,
                    subject: "Confirm Email",
                    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
                }, (err, info) => {
                    if (err) {
                        console.error("Error sending email:", err);
                    } else {
                        console.log("Email sent:", info.response);
                        res.status(201).json(emailToken);
                    }
                });                
            },
        );
    } catch (err) {
        res.status(400).send("Error registering user");
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password, authCode } = req.body;
        const user = await User.login(email, password);
        if (!user.confirmed) {
            res.status(403).send("Please confirm your email to login");
        } else {
            if (authCode === "") {
                code = generateRandomCode();
                authCodes[user._id] = code;

                transporter.sendMail({
                    from: 'm43941931@gmail.com',
                    to: user.email,
                    subject: "2FA Auth",
                    html: `2FA Authenticator Code: <h1>${code}</h1>`,
                }, (err, info) => {
                    if (err) {
                        console.error("Error sending 2FA email:", err);
                    } else {
                        console.log("Email 2FA sent:", info.response);
                    }
                });
                res.status(200).send("Auth code sent to email");  
            } else {
                if (authCode === authCodes[user._id]) {
                    const token = createToken(user._id);
                    res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000
                    });
                    delete authCodes[user._id];
                    res.status(200).json(user);
                } else {
                    console.log(authCodes[user._id]);
                    res.status(403).send("Wrong auth code");
                }
            }
        }  
    } catch (err) {
        res.status(400).send("Error logging user in");
    }
}

module.exports.logout = (req, res) => {
    //res.cookie('jwt', '', {maxAge: 1});
    res.clearCookie('jwt').status(200).send("Logged out successfully");
}

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).send("User not found");
    }  
}