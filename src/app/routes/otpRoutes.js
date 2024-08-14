// routes/otpRoutes.js

const express = require('express');
const { createOTP, otpVerify } = require('../controllers/otpController');

const router = express.Router();

router.post('/generate', createOTP);
router.post('/verify', otpVerify);

module.exports = router;
