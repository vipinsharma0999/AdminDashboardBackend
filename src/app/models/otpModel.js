// models/otp.js

const crypto = require('crypto');
const { connectToDatabase } = require('../lib/db');
// const nodemailer = require('nodemailer'); // or any other service for sending OTP

async function generateOTP(userId) {
    const otpCode = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const expiration = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    const connection = await connectToDatabase();

    // Generate a unique OTP ID
    let otpId;
    let result;
    do {
        otpId = crypto.randomBytes(3).toString('hex').toUpperCase();
        [result] = await connection.execute('SELECT COUNT(*) AS count FROM otp WHERE otp_id = ?', [otpId]);
    } while (result[0].count > 0);

    await connection.execute(
        'INSERT INTO otp (otp_id, user_id, otp_code, expiration) VALUES (?, ?, ?, ?)',
        [otpId, userId, otpCode, expiration]
    );

    await connection.end();

    // Send OTP to user (email/SMS logic)
    await sendOTPToUser(userId, otpCode);

    return otpId; // Return the OTP ID to use for verification
}

async function sendOTPToUser(userId, otpCode) {
    // Implement your email or SMS sending logic here
    // Example using nodemailer to send OTP via email

    const connection = await connectToDatabase();
    const [user] = await connection.execute('SELECT email FROM users WHERE user_id = ?', [userId]);
    await connection.end();

    if (user.length === 0) {
        throw new Error('User not found');
    }

    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail', // use your email service
    //     auth: {
    //         user: 'your-email@gmail.com',
    //         pass: 'your-email-password'
    //     }
    // });

    // const mailOptions = {
    //     from: 'your-email@gmail.com',
    //     to: user[0].email,
    //     subject: 'Your OTP Code',
    //     text: `Your OTP code is ${otpCode}. It will expire in 15 minutes.`
    // };

    // await transporter.sendMail(mailOptions);
}

async function verifyOTP(userId, otpCode) {
    const connection = await connectToDatabase();
    const [otpRecords] = await connection.execute(
        'SELECT * FROM otp WHERE user_id = ? AND otp_code = ? AND expiration > NOW()',
        [userId, otpCode]
    );

    await connection.end();

    if (otpRecords.length === 0) {
        throw new Error('Invalid or expired OTP');
    }

    // Optionally, delete the OTP record after successful verification
    await connection.execute('DELETE FROM otp WHERE user_id = ? AND otp_code = ?', [userId, otpCode]);

    return true;
}

module.exports = { generateOTP, verifyOTP };
