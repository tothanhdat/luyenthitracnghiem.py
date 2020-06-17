const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const departmentSchema = new Schema({

    //Tên
    name: String,

    //Mô tả
    description: String,

    //Địa chỉ
    address: String,

    //SĐT
    phone: String,

    //Hình ảnh
    image: String,

    //Ghi chú
    note: String,
    
    //Trạng thái hoạt động
    status: {
        type: Number,
        default: 0
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

    //Tài liệu
    document: [{
        type: Schema.Types.ObjectId,
        ref : "document"
    }],

    //Admin phòng ban
    admin: [{
        type: Schema.Types.ObjectId,
        ref : "admin"
    }],
    
});

const DEPARTMENT_MODEL = mongoose.model('department', departmentSchema);
module.exports  = DEPARTMENT_MODEL;