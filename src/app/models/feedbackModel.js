// models/feedbackModel.js

const { connectToDatabase } = require('../lib/db');
const crypto = require('crypto');

async function createFeedback(feedbackData) {
    const connection = await connectToDatabase();

    // Generate a unique feedback ID
    let feedbackId;
    let result;
    do {
        feedbackId = crypto.randomBytes(3).toString('hex').toUpperCase();
        [result] = await connection.execute(`SELECT COUNT(*) AS count FROM feedback WHERE feedback_id = ?`, [feedbackId]);
    } while (result[0].count > 0);

    [result] = await connection.execute(
        `INSERT INTO feedback (feedback_id, booking_id, rating, comments)
         VALUES (?, ?, ?, ?)`,
        [
            feedbackId,
            feedbackData.booking_id,
            feedbackData.rating,
            feedbackData.comments || null
        ]
    );
    await connection.end();
    return feedbackId; // Return the generated feedback ID
}

async function getAllFeedback() {
    const connection = await connectToDatabase();
    const [feedback] = await connection.execute('SELECT * FROM feedback');
    await connection.end();
    return feedback;
}

async function getFeedbackByBookingOrUser(query) {
    const connection = await connectToDatabase();
    const [feedback] = await connection.execute(
        `SELECT * FROM feedback WHERE booking_id = ? OR user_id = ?`,
        [query.booking_id, query.user_id]
    );
    await connection.end();
    return feedback;
}

module.exports = { createFeedback, getAllFeedback, getFeedbackByBookingOrUser };
