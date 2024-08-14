// controllers/userController.js

const { getUsers, addUser } = require('../services/userService');
const { getAllAccounts } = require('../models/userModel');

async function getAllUsers(req, res) {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllAccount(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await getAllAccounts();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function createUser(req, res) {
    try {
        const userData = req.body;
        const result = await addUser(userData);
        res.status(201).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateUser(userId, userData) {
    const connection = await connectToDatabase();
    const [result] = await connection.execute(
        'UPDATE users SET first_name = ?, last_name = ?, email = ?, contact = ?, address = ?, pan_card = ?, role_id = ? WHERE user_id = ?',
        [
            userData.first_name,
            userData.last_name,
            userData.email,
            userData.contact,
            userData.address,
            userData.pan_card,
            userData.role_id,
            userId,
        ]
    );
    await connection.end();
    return result;
}

module.exports = { getAllUsers, createUser, updateUser, getAllAccount };
