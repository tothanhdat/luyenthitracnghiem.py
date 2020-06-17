const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const SubjectSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

    /**
     * Tên
     */
    name: String,

    teacher: String,

    /**
     * Bộ đề
     */
    exams: [{
        type: Schema.Types.ObjectId,
        ref: "exam",
        default: []
    }],
});

const SUBJECT_MODEL = mongoose.model('subject', SubjectSchema);
module.exports  = SUBJECT_MODEL;