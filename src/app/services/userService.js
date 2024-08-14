// services/userService.js

const bcrypt = require('bcryptjs');
const { getAllUsers, createUser } = require('../models/userModel');

async function getUsers() {
    return await getAllUsers();
}

async function addUser(userData) {
    return await createUser(userData);
}

module.exports = { getUsers, addUser };
