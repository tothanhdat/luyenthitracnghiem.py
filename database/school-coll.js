const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schoolSchema = new Schema({

    //Tên trường
    name: String,

    //Email
    email: { type: String, required: true, unique: true },

    //Địa chỉ
    address: String,

    //SĐT trường
    phone: String,

    //Logo/Hình ảnh trường
    image: String,

    //Thời gian hoạt động
    timeActive: Date,
    
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

    //Hiệu trưởng
    principal: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },
    
});

const SCHOOL_MODEL = mongoose.model('school', schoolSchema);
module.exports  = SCHOOL_MODEL;