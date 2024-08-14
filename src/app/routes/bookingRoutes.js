// routes/bookingRoutes.js

const express = require('express');
const { createBooking, getAllBookings, getBookingsByDate, updateBookingController } = require('../controllers/bookingController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               booking_time:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-08-01T10:00:00Z
 *               alloted_to:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   booking_id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   booking_time:
 *                     type: string
 *                     format: date-time
 *                   alloted_to:
 *                     type: boolean
 *                   completion_time:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /bookings/{date}:
 *   get:
 *     summary: Get bookings by date
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter bookings
 *     responses:
 *       200:
 *         description: List of bookings for the specified date
 *       400:
 *         description: Invalid date format
 */


router.post('/', verifyToken, createBooking);
router.get('/', verifyToken, getAllBookings);
router.get('/by-date', verifyToken, getBookingsByDate);
// Update booking route
router.put('/bookings/:id', updateBookingController);

module.exports = router;
