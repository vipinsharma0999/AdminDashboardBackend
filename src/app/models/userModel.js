// models/userModel.js

const { connectToDatabase } = require('../lib/db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

async function getAllUsers() {
    const connection = await connectToDatabase();
    const [users] = await connection.execute(`
        SELECT u.user_id, u.first_name, u.last_name, u.email, u.contact, u.address, u.pan_card, u.is_verified, u.role_id
        FROM users u
        LEFT JOIN user_auth ua ON u.user_id = ua.user_id
        WHERE ua.user_id IS NULL
    `);
    await connection.end();
    return users;
}

async function getAllAccounts() {
    const connection = await connectToDatabase();
    const [users] = await connection.execute(`
        SELECT u.user_id, u.first_name, u.last_name, u.email, u.contact, u.address, u.pan_card, u.is_verified, u.role_id
        FROM users u
        JOIN user_auth ua ON u.user_id = ua.user_id
    `);
    await connection.end();
    return users;
}

async function createUser(userData) {
    const connection = await connectToDatabase();

    // Generate a unique user ID
    let user_id;
    let result;
    do {
        user_id = crypto.randomBytes(6).toString('hex').toUpperCase(); // Generate a 12-character hex string
        [result] = await connection.execute(`SELECT COUNT(*) AS count FROM users WHERE user_id = ?`, [user_id]);
    } while (result[0].count > 0);

    // Prepare user data for insertion
    const userValues = [
        user_id,
        userData.first_name,
        userData.last_name,
        userData.email || null,
        userData.contact,
        userData.address,
        userData.pan_card || null,
        userData.is_verified || false,
        userData.role_id
    ];

    // Insert user into users table
    const [insertResult] = await connection.execute(
        `INSERT INTO users (user_id, first_name, last_name, email, contact, address, pan_card, is_verified, role_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        userValues
    );

    // Handle password if provided
    if (userData.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Insert hashed password into user_auth table
        await connection.execute(
            `INSERT INTO user_auth (user_id, password_hash) VALUES (?, ?)`,
            [user_id, hashedPassword]
        );
    }

    await connection.end();
    return { user_id }; // Return the generated user ID
}

async function updateUser(userId, updateData) {
    const connection = await connectToDatabase();
    const [result] = await connection.execute(
        `UPDATE users 
         SET first_name = ?, last_name = ?, email = ?, contact = ?, address = ?, pan_card = ?, is_verified = ?, role_id = ?
         WHERE user_id = ?`,
        [
            updateData.first_name,
            updateData.last_name,
            updateData.email || null,
            updateData.contact,
            updateData.address,
            updateData.pan_card || null,
            updateData.is_verified || false,
            updateData.role_id,
            userId
        ]
    );
    await connection.end();
    return result;
}

module.exports = { getAllUsers, createUser, updateUser, getAllAccounts };