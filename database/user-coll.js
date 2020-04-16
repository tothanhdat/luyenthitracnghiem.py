const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({

    fullname: String,

    email: { type: String, required: true, unique: true },

    password: String,
    
    /**
     * 1. Admin
     * 0. User
     * 100. Super Admin
     */
    role: { type: Number, default: 0 },
});

const USER_MODEL = mongoose.model('user', userSchema);
module.exports  = USER_MODEL;