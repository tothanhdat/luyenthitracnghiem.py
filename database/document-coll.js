const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const documentSchema = new Schema({

    //Tên
    name: String,

    //Mô tả
    description: String,


    //Danh sách cán bộ lớp
    monitors: [{
        type: Schema.Types.ObjectId,
        ref : "user"
    }],

    //Trạng thái
    status: {
        type: Number,
        default: 1,
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

    //Thuộc về môn học nào
    subject: {
        type: Schema.Types.ObjectId,
        ref : "subject"
    },

    //Thuộc về bộ đề nào
    exam: {
        type: Schema.Types.ObjectId,
        ref : "exam"
    },

    //Thuộc về trường nào
    school: {
        type: Schema.Types.ObjectId,
        ref : "school"
    },

    //Thuộc về phòng ban nào
    department: {
        type: Schema.Types.ObjectId,
        ref : "department"
    },
    
});

const DOCUMENT_SCHEMA = mongoose.model('document', documentSchema);
module.exports  = DOCUMENT_SCHEMA;