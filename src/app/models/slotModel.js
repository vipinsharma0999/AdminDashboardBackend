// models/slotModel.js

const { connectToDatabase } = require('../lib/db');

async function createSlot(slotData) {
    const connection = await connectToDatabase();
    const [result] = await connection.execute(
        `INSERT INTO slots (purpose_id, start_time, end_time)
         VALUES (?, ?, ?)`,
        [
            slotData.purpose_id,
            slotData.start_time,
            slotData.end_time
        ]
    );
    await connection.end();
    return result;
}

async function getAllSlots() {
    const connection = await connectToDatabase();
    const [slots] = await connection.execute('SELECT * FROM slots');
    await connection.end();
    return slots;
}

async function getSlotByDonationPurpose(purposeId) {
    const connection = await connectToDatabase();
    const [slots] = await connection.execute(
        `SELECT * FROM slots WHERE purpose_id = ?`,
        [purposeId]
    );
    await connection.end();
    return slots;
}

module.exports = { createSlot, getAllSlots, getSlotByDonationPurpose };
