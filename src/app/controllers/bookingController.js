// controllers/bookingController.js

const { addBooking, listBookings, listBookingsByDate } = require('../services/bookingService');

async function createBooking(req, res) {
    try {
        const result = await addBooking(req.body);
        res.status(201).json({ bookingId: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllBookings(req, res) {
    try {
        const bookings = await listBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getBookingsByDate(req, res) {
    try {
        const date = req.query.date;
        if (!date) {
            return res.status(400).json({ error: 'Date query parameter is required' });
        }
        const bookings = await listBookingsByDate(date);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update booking controller
async function updateBookingController(req, res) {
    const bookingId = req.params.id; // Assuming the booking ID is passed as a URL parameter
    const { alloted_to, completion_time } = req.body; // Extract only updatable fields

    try {
        const result = await updateBooking(bookingId, { alloted_to, completion_time });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.json({ message: 'Booking updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
}

module.exports = { createBooking, getAllBookings, getBookingsByDate, updateBookingController };
