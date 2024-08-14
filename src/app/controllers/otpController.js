// controllers/otpController.js

const { generateOTP, verifyOTP } = require('../models/otpModel');

async function createOTP(req, res) {
    if (req.method === 'POST') {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        try {
            const otpId = await generateOTP(userId);
            res.status(200).json({ otpId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function otpVerify(req, res) {
    if (req.method === 'POST') {
        const { userId, otpCode } = req.body;
        if (!userId || !otpCode) {
            return res.status(400).json({ message: 'User ID and OTP code are required' });
        }

        try {
            const isValid = await verifyOTP(userId, otpCode);
            res.status(200).json({ isValid });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

module.exports = { createOTP, otpVerify };
