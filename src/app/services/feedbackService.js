// services/feedbackService.js

const { createFeedback, getFeedbackByBookingId, getFeedbackByUserId, getAllFeedback } = require('../models/feedbackModel');

async function addFeedback(feedbackData) {
    return await createFeedback(feedbackData);
}

async function listFeedbackByBookingId(booking_id) {
    return await getFeedbackByBookingId(booking_id);
}

async function listFeedbackByUserId(user_id) {
    return await getFeedbackByUserId(user_id);
}

async function listAllFeedback() {
    return await getAllFeedback();
}

module.exports = { addFeedback, listFeedbackByBookingId, listFeedbackByUserId, listAllFeedback };
