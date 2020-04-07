const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const SubjectSchema = new Schema({

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

const SUBJECT_MODEL = mongoose.model('subjects', SubjectSchema);
module.exports  = SUBJECT_MODEL;