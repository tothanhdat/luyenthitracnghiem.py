const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ResultSchema = new Schema({

    point: String,

    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

    exam: {
        type: Schema.Types.ObjectId,
        ref : "exam"
    },

    createAt: { type: Date, required: true, default: Date.now }
});

const RESULT_MODEL = mongoose.model('point', ResultSchema);
module.exports  = RESULT_MODEL;