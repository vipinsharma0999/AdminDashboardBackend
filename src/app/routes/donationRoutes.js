// routes/donationRoutes.js

const express = require('express');
const { createDonation, getAllDonations } = require('../controllers/donationController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /donations:
 *   post:
 *     summary: Create a new donation
 *     tags: [Donations]
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
 *               transaction_id:
 *                 type: string
 *                 example: TRX123456
 *               amount:
 *                 type: number
 *                 example: 100.50
 *               donation_time:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-08-01T10:00:00Z
 *               purpose_id:
 *                 type: integer
 *                 example: 1
 *               referral_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /donations:
 *   get:
 *     summary: Get all donations
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: List of donations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   donation_id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   transaction_id:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   donation_time:
 *                     type: string
 *                     format: date-time
 *                   purpose_id:
 *                     type: integer
 *                   referral_id:
 *                     type: integer
 *       500:
 *         description: Internal Server Error
 */


router.post('/', verifyToken, createDonation);
router.get('/', verifyToken, getAllDonations);

module.exports = router;
