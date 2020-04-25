const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ResultSchema = new Schema({

    point: String,

    falseArr: [{
        type: Schema.Types.ObjectId,
        ref : "question",
        default: [],
    }],

    trueArr: [{
        type: Schema.Types.ObjectId,
        ref : "question",
        default: [],
    }],

    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

    exam: {
        type: Schema.Types.ObjectId,
        ref : "exam"
    },

    unfinishQuestion: String,

    createAt: { type: Date, required: true, default: Date.now }
});

const RESULT_MODEL = mongoose.model('result', ResultSchema);
module.exports  = RESULT_MODEL;