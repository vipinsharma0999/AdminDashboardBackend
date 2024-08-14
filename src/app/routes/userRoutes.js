// routes/userRoutes.js

const express = require('express');
const { getAllUsers, createUser, updateUser, getAllAccount } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               contact:
 *                 type: string
 *                 example: 1234567890
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               pan_card:
 *                 type: string
 *                 example: ABCDE1234F
 *               role_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   address:
 *                     type: string
 *                   pan_card:
 *                     type: string
 *                   role_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: No token provided
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Jane
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: janedoe@example.com
 *               contact:
 *                 type: string
 *                 example: 0987654321
 *               address:
 *                 type: string
 *                 example: 456 Elm St
 *               pan_card:
 *                 type: string
 *                 example: EFGHI5678J
 *               role_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 */

router.get('/', verifyToken, getAllUsers);
router.get('/allaccounts', verifyToken, getAllAccount);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const result = await updateUser(userId, userData);
        if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send('User updated successfully');
        }
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

module.exports = router;
