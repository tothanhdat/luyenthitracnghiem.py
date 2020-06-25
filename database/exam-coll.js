const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ExamSchema = new Schema({

    /**
     * Tên
     */
    name: String,

    description: String,

    //Loại giao diện đề
    type: String,

    //Ghi chú
    note: String,

    //Trạng thái
    status: String,

    file: String,

    //Người tạo
    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

    //Người cập nhật
    userUpdate: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

    /**
     * Môn học
     */
    subject: {
        type: Schema.Types.ObjectId,
        ref: "subject",
    },


     /**
     * Tài liệu
     */
    documents: [{
        type: Schema.Types.ObjectId,
        ref: "document",
    }],
    
    /**
     * Thuộc trường nào
     */
    department: {
        type: Schema.Types.ObjectId,
        ref: "department",
    },

    /**
     * Thuộc phòng ban/khoa nào
     */
    school: {
        type: Schema.Types.ObjectId,
        ref: "school",
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

    //Độ khó---- 0: Dễ || 1: Vừa || 2: Khó
    level_difficult: {
        type: Number,
        default: 1
    },

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
    saveExam: [{
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