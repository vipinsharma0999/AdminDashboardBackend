// services/slotService.js

const { createSlot, getSlotsByPurposeId, getAllSlots } = require('../models/slotModel');

async function addSlot(slotData) {
    return await createSlot(slotData);
}

async function listSlotsByPurposeId(purpose_id) {
    return await getSlotsByPurposeId(purpose_id);
}

async function listAllSlots() {
    return await getAllSlots();
}

module.exports = { addSlot, listSlotsByPurposeId, listAllSlots };
