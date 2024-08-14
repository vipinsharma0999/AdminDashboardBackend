// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { getTokenFromDb } = require('../models/tokenModel');

// const secretKey = process.env.JWT_SECRET; // Load the secret key from the environment
const secretKey = 's3cR3tK3y!vErY$eCuR3&c0mPlex!';

async function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);

        // Check if the token is in the user_tokens table
        const storedToken = await getTokenFromDb(decoded.userId, token);

        if (!storedToken) {
            return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
        }

        // Attach user ID to the request for further use
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Failed to authenticate token.', error });
    }
}

module.exports = verifyToken;
