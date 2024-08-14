// models/tokenModel.js

const { connectToDatabase } = require('../lib/db');

async function getTokenFromDb(userId, token) {
    const connection = await connectToDatabase();

    const [tokens] = await connection.execute(
        'SELECT * FROM user_tokens WHERE user_id = ? AND token = ?',
        [userId, token]
    );

    await connection.end();

    return tokens.length > 0 ? tokens[0] : null;
}

async function saveUserToken(userId, token) {
    const connection = await connectToDatabase();

    // Check if the token already exists for the user
    const [existingTokens] = await connection.execute(
        'SELECT * FROM user_tokens WHERE user_id = ?',
        [userId]
    );

    if (existingTokens.length > 0) {
        // Update the existing token
        await connection.execute(
            'UPDATE user_tokens SET token = ? WHERE user_id = ?',
            [token, userId]
        );
    } else {
        // Insert a new token if no existing token is found
        await connection.execute(
            'INSERT INTO user_tokens (user_id, token) VALUES (?, ?)',
            [userId, token]
        );
    }

    await connection.end();
}

module.exports = { saveUserToken, getTokenFromDb };
