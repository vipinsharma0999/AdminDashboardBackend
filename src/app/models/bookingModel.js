// models/bookingModel.js

const { connectToDatabase } = require('../lib/db');
const crypto = require('crypto');

async function createBooking(bookingData) {
    const connection = await connectToDatabase();

    // Generate a unique booking ID
    let bookingId;
    let result;
    do {
        bookingId = crypto.randomBytes(3).toString('hex').toUpperCase();
        [result] = await connection.execute(`SELECT COUNT(*) AS count FROM bookings WHERE booking_id = ?`, [bookingId]);
    } while (result[0].count > 0);

    [result] = await connection.execute(
        `INSERT INTO bookings (booking_id, donation_id, user_id, slot_id, booking_time, is_completed, completion_time)
         VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
        [
            bookingId,
            bookingData.donation_id,
            bookingData.user_id,
            bookingData.slot_id,
            bookingData.is_completed || false,
            bookingData.completion_time || null
        ]
    );
    await connection.end();
    return bookingId; // Return the generated booking ID
}

async function updateBooking(bookingId, updateData) {
    const connection = await connectToDatabase();
    const [result] = await connection.execute(
        `UPDATE bookings 
         SET alloted_to = ?, completion_time = ?
         WHERE booking_id = ?`,
        [
            updateData.alloted_to || null,
            updateData.completion_time || null,
            bookingId
        ]
    );
    await connection.end();
    return result;
}

async function getAllBookings() {
    const connection = await connectToDatabase();
    const [bookings] = await connection.execute(`
        SELECT 
            b.booking_id,
            b.donation_id,
            b.user_id,
            b.slot_id,
            b.booking_time,
            b.is_completed,
            b.completion_time,
            d.transaction_id,
            d.amount,
            d.donation_time,
            d.purpose_id,
            d.referral_id,
            u.first_name,
            u.last_name,
            u.contact
        FROM bookings b
        JOIN donations d ON b.donation_id = d.donation_id
        JOIN users u ON b.user_id = u.user_id
    `);
    await connection.end();
    return bookings;
}

async function getBookingByDate(date) {
    const connection = await connectToDatabase();
    const [bookings] = await connection.execute(`
        SELECT 
            b.booking_id,
            b.donation_id,
            b.user_id,
            b.slot_id,
            b.booking_time,
            b.is_completed,
            b.completion_time,
            d.transaction_id,
            d.amount,
            d.donation_time,
            d.purpose_id,
            d.referral_id,
            u.first_name,
            u.last_name,
            u.contact
        FROM bookings b
        JOIN donations d ON b.donation_id = d.donation_id
        JOIN users u ON b.user_id = u.user_id
        WHERE DATE(b.booking_time) = ?
    `, [date]);
    await connection.end();
    return bookings;
}

module.exports = { createBooking, updateBooking, getAllBookings, getBookingByDate };
