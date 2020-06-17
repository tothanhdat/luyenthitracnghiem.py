const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const classSchema = new Schema({

    //Tên
    name: String,

    //Lớp 8 9 10 11 12
    grade_level: Number,

    //Thời khóa biểu của lớp
    timetable: String,

    //Danh sách học sinh lớp
    users: [{
        type: Schema.Types.ObjectId,
        ref : "user"
    }],

    //Danh sách cán bộ lớp
    monitors: [{
        type: Schema.Types.ObjectId,
        ref : "user"
    }],

    //Giáo viên chủ nhiệm
    teacher: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },
    
    //Ngày tạo
    createAt: {
        type: Date,
        default: Date.now()
    },

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

    //Thuộc về trường nào
    school: {
        type: Schema.Types.ObjectId,
        ref : "school"
    },
    
});

const CLASS_MODEL = mongoose.model('class', classSchema);
module.exports  = CLASS_MODEL;