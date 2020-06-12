const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ExamSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

    /**
     * Tên
     */
    name: String,

    description: String,

    /**
     * Môn học
     */
    subjects: {
        type: Schema.Types.ObjectId,
        ref: "subjects",
    },

    question: [{
        type: Schema.Types.ObjectId,
        ref: "question",
    }],

    /**
     * Khối(lớp)
     */
    level: { type: Number, default: 1 },

    //Thời gian đếm ngược
    timeDoTest: String,

    result: [{
        type: Schema.Types.ObjectId,
        ref: "result",
        default: []
    }],

    //Lượt xem
    seen: [{
        type: Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],

    //Lưu
    saveTask: [{
        type: Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment",
        default: []
    }],

    createAt: { type: Date, required: true, default: Date.now },
    
});

const EXAM_MODEL = mongoose.model('exam', ExamSchema);
module.exports  = EXAM_MODEL;