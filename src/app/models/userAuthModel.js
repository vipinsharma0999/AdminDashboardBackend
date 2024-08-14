// models/userAuthModel.js

const { connectToDatabase } = require('../lib/db');

async function createUserAuth(user_id, password_hash) {
    const connection = await connectToDatabase();
    await connection.execute(
        'INSERT INTO user_auth (user_id, password_hash) VALUES (?, ?)',
        [user_id, password_hash]
    );
    await connection.end();
}

async function getUserAuthByUserId(user_id) {
    const connection = await connectToDatabase();
    const [auth] = await connection.execute(
        'SELECT * FROM user_auth WHERE user_id = ?',
        [user_id]
    );
    await connection.end();
    return auth;
}

module.exports = { createUserAuth, getUserAuthByUserId };
