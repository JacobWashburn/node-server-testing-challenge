const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secrets');

module.exports = (req, res, next) => {
    if (process.env.DB_ENV === 'testing') {
        next();
    } else {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({message: 'The token provided is incorrect.'});
                } else {
                    req.user = decodedToken.user;
                    next();
                }
            });
        } else {
            res.status(400).json({message: 'You must provide a token.'});
        }
    }

};