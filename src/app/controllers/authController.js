// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { connectToDatabase } = require('../lib/db');

// const secretKey = process.env.JWT_SECRET; // Load the secret key from the environment
const secretKey = 's3cR3tK3y!vErY$eCuR3&c0mPlex!';

const { registerUser, loginUser } = require('../services/authService');
const { saveUserToken } = require('../models/tokenModel');

async function register(req, res) {
    try {
        const result = await registerUser(req.body);
        res.status(201).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { contact, password } = req.body;
        const connection = await connectToDatabase();

        // Updated query to join with roles table and select role_name
        const [users] = await connection.execute(
            'SELECT users.user_id, users.role_id, roles.role_name, user_auth.password_hash ' +
            'FROM users ' +
            'INNER JOIN user_auth ON users.user_id = user_auth.user_id ' +
            'INNER JOIN roles ON users.role_id = roles.role_id ' +
            'WHERE contact = ?',
            [contact]
        );

        if (users.length === 0) {
            await connection.end();
            return res.status(401).send('Authentication failed: User not found');
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            await connection.end();
            return res.status(401).send('Authentication failed: Incorrect password');
        }

        // Create the token
        const token = jwt.sign(
            { userId: user.user_id, roleId: user.role_id },
            secretKey,
            { expiresIn: '1h' }
        );

        // Save the token in the user_tokens table
        await saveUserToken(user.user_id, token);

        await connection.end();
        res.status(200).json({ token, role: user.role_name });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { register, login };
