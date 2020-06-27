const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({

    fullname: String,

    email: { type: String, required: true, unique: true },

    password: String,
    
    /**
     * 1. Admin
     * 0. User
     * 100. Super Admin
     */
    role: { type: Number, default: 0 },

    //Số điện thoại
    phone: String,

    //Ngày sinh
    birthDay: Date,

    //Địa chỉ
    address: String,

    //Hình ảnh
    avatar: String,

    //Giới tính
    gender: { type: Number, default: 0 },
    
    //Cấp bậc
    level: { type: Number, default: 0 },

    //Trạng thái hoạt động
    status: { type: Number, default: 1 },

    //Thuộc về phòng nào
    department: {
        type: Schema.Types.ObjectId,
        ref : "department"
    },

    //Thuộc về trường nào
    school: {
        type: Schema.Types.ObjectId,
        ref : "school"
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

    //Ngày tạo
    createAt: { type: Date, default: Date.now() },

    //Ngày cập nhật
    updateAt: { type: Date, default: Date.now() }
    
});

const USER_MODEL = mongoose.model('user', userSchema);
module.exports  = USER_MODEL;