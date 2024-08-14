// controllers/feedbackController.js

const { addFeedback, listFeedbackByBookingId, listFeedbackByUserId, listAllFeedback } = require('../services/feedbackService');

async function createFeedback(req, res) {
    try {
        const result = await addFeedback(req.body);
        res.status(201).json({ feedbackId: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getFeedbackByBookingId(req, res) {
    try {
        const booking_id = req.query.booking_id;
        if (!booking_id) {
            return res.status(400).json({ error: 'Booking ID query parameter is required' });
        }
        const feedback = await listFeedbackByBookingId(booking_id);
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getFeedbackByUserId(req, res) {
    try {
        const user_id = req.query.user_id;
        if (!user_id) {
            return res.status(400).json({ error: 'User ID query parameter is required' });
        }
        const feedback = await listFeedbackByUserId(user_id);
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllFeedback(req, res) {
    try {
        const feedback = await listAllFeedback();
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createFeedback, getFeedbackByBookingId, getFeedbackByUserId, getAllFeedback };
