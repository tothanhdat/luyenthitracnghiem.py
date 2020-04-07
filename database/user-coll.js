const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: String,
    /**
     * 1. Admin
     * 0. User
     */
    role: { type: Number, default: 0 },
});

const USER_MODEL = mongoose.model('user', userSchema);
module.exports  = USER_MODEL;