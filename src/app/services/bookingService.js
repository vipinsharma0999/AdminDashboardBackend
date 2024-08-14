// services/bookingService.js

const { createBooking, getAllBookings, getBookingsByDate } = require('../models/bookingModel');

async function addBooking(bookingData) {
    return await createBooking(bookingData);
}

async function listBookings() {
    return await getAllBookings();
}

async function listBookingsByDate(date) {
    return await getBookingsByDate(date);
}

module.exports = { addBooking, listBookings, listBookingsByDate };
