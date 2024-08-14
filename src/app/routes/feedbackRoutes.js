// routes/feedbackRoutes.js

const express = require('express');
const { createFeedback, getFeedbackByBookingId, getFeedbackByUserId, getAllFeedback } = require('../controllers/feedbackController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create new feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booking_id:
 *                 type: integer
 *                 example: 1
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comments:
 *                 type: string
 *                 example: Excellent service!
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /feedback/user/{userId}:
 *   get:
 *     summary: Get feedback by user ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Feedback for the specified user
 *       404:
 *         description: Feedback not found
 */

/**
 * @swagger
 * /feedback/booking/{bookingId}:
 *   get:
 *     summary: Get feedback by booking ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the booking
 *     responses:
 *       200:
 *         description: Feedback for the specified booking
 *       404:
 *         description: Feedback not found
 */

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get all feedback
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of all feedback
 *       500:
 *         description: Internal Server Error
 */


router.post('/', verifyToken, createFeedback);
router.get('/by-booking', verifyToken, getFeedbackByBookingId);
router.get('/by-user', verifyToken, getFeedbackByUserId);
router.get('/', verifyToken, getAllFeedback);

module.exports = router;
