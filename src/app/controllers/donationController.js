// controllers/donationController.js

const { addDonation, listDonations } = require('../services/donationService');

async function createDonation(req, res) {
    try {
        const result = await addDonation(req.body);
        res.status(201).json({ donationId: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllDonations(req, res) {
    try {
        const donations = await listDonations();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createDonation, getAllDonations };
