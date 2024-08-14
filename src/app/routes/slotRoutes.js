// routes/slotRoutes.js

const express = require('express');
const { createSlot, getSlotsByPurposeId, getAllSlots } = require('../controllers/slotController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /slots:
 *   post:
 *     summary: Create a new slot
 *     tags: [Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purpose_id:
 *                 type: integer
 *                 example: 1
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-08-01T10:00:00Z
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-08-01T11:00:00Z
 *     responses:
 *       201:
 *         description: Slot created successfully
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /slots:
 *   get:
 *     summary: Get all slots
 *     tags: [Slots]
 *     responses:
 *       200:
 *         description: List of all slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   slot_id:
 *                     type: integer
 *                   purpose_id:
 *                     type: integer
 *                   start_time:
 *                     type: string
 *                     format: date-time
 *                   end_time:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /slots/purpose/{purposeId}:
 *   get:
 *     summary: Get slots by donation purpose ID
 *     tags: [Slots]
 *     parameters:
 *       - in: path
 *         name: purposeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the donation purpose
 *     responses:
 *       200:
 *         description: Slots for the specified donation purpose
 *       404:
 *         description: Slots not found
 */


router.post('/', verifyToken, createSlot);
router.get('/by-purpose', verifyToken, getSlotsByPurposeId);
router.get('/', verifyToken, getAllSlots);

module.exports = router;
