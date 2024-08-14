// services/authService.js

const bcrypt = require('bcryptjs');
const { createUserAuth, getUserAuthByUserId } = require('../models/userAuthModel');
const { createUser } = require('../models/userModel');

async function registerUser(userData) {
    return await createUser(userData);
}

async function loginUser(username, password) {
    const [users] = await getAllUsers();
    const user = users.find(user => user.username === username);

    if (!user) throw new Error('Invalid credentials');

    const [auth] = await getUserAuthByUserId(user.user_id);
    if (auth.length === 0) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, auth[0].password_hash);
    if (!isMatch) throw new Error('Invalid credentials');

    return { userId: user.user_id };
}

module.exports = { registerUser, loginUser };
