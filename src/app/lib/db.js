// lib/db.js

const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'donation_system',
};

async function connectToDatabase() {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
}

module.exports = { connectToDatabase };
