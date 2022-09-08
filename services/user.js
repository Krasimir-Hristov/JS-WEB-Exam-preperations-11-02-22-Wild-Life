const User = require('../models/User');
const { hash, compare } = require('bcrypt');


//TODO add all fields required by the exam
async function register(username, password) {
    const existing = await getUserByUsername(username);

    if(existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username,
        hashedPassword
    });
    await user.save();

    return user;
}

//TODO chnage identifier
async function login(username, password) {
    const user = await getUserByUsername(username);

    if(!user) {
        throw new Error('User dosent exist');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if(!hasMatch) {
        throw new Error('Incorrect password');
    }

    return user;
}

//TODO identify user by given indentifier
async function getUserByUsername(username) {
    const user = await User.findOne({ username });

    return user;
}

module.exports = {
    login,
    register
}