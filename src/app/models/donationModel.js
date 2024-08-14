// models/donationModel.js

const { connectToDatabase } = require('../lib/db');
const crypto = require('crypto');

async function createDonation(donationData) {
    const connection = await connectToDatabase();

    // Generate a unique donation ID
    let donationId;
    let result;
    do {
        donationId = crypto.randomBytes(3).toString('hex').toUpperCase();
        [result] = await connection.execute(`SELECT COUNT(*) AS count FROM donations WHERE donation_id = ?`, [donationId]);
    } while (result[0].count > 0);

    [result] = await connection.execute(
        `INSERT INTO donations (donation_id, user_id, transaction_id, amount, donation_time, purpose_id, referral_id)
         VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
        [
            donationId,
            donationData.user_id || null,
            donationData.transaction_id || null,
            donationData.amount,
            donationData.purpose_id,
            donationData.referral_id || null
        ]
    );
    await connection.end();
    return donationId; // Return the generated donation ID
}

async function getAllDonations() {
    const connection = await connectToDatabase();
    const [donations] = await connection.execute('SELECT * FROM donations');
    await connection.end();
    return donations;
}

module.exports = { createDonation, getAllDonations };
