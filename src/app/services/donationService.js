// services/donationService.js

const { createDonation, getAllDonations } = require('../models/donationModel');

async function addDonation(donationData) {
    return await createDonation(donationData);
}

async function listDonations() {
    return await getAllDonations();
}

module.exports = { addDonation, listDonations };
