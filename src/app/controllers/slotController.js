// controllers/slotController.js

const { addSlot, listSlotsByPurposeId, listAllSlots } = require('../services/slotService');

async function createSlot(req, res) {
    try {
        const result = await addSlot(req.body);
        res.status(201).json({ slotId: result.insertId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getSlotsByPurposeId(req, res) {
    try {
        const purpose_id = req.query.purpose_id;
        if (!purpose_id) {
            return res.status(400).json({ error: 'Purpose ID query parameter is required' });
        }
        const slots = await listSlotsByPurposeId(purpose_id);
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllSlots(req, res) {
    try {
        const slots = await listAllSlots();
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createSlot, getSlotsByPurposeId, getAllSlots };
