const ObjectID = require('mongoose').Types.ObjectId;
const USER_COLL= require('../database/user-coll');
const { hash, compare } = require('bcrypt');
const { sign, verify } = require('../utils/jwt');
module.exports = class user {
    static register(email, password, fullname) {
        return new Promise(async resolve => {
            try {
                let checkExist = await USER_COLL.findOne({ email });
                if (checkExist)
                    return resolve({ error: true, message: 'email_existed' });
                let hashPassword = await hash(password, 8);
                let newUser = new USER_COLL({ fullname, email, password: hashPassword });
                let infoUSer = await newUser.save();
                if (!infoUSer) return resolve({ error: true, message: 'cannot_insert' });
                resolve({ error: false, data: infoUSer });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static signIn(email, password) {
        return new Promise(async resolve => {
            try {
                const infoUSer = await USER_COLL.findOne({ email });
                if (!infoUSer)
                    return resolve({ error: true, message: 'email_not_exist' });
                    
                const checkPass = await compare(password, infoUSer.password);
                if (!checkPass)
                    return resolve({ error: true, message: 'password_not_true' });
                await delete infoUSer.password;

                let token = await sign({ data: infoUSer });
                return resolve({ error: false, data: { infoUSer, token } });
                
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listUser = await USER_COLL.find();

                if (!listUser) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listUser });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo(userID) {
        return new Promise(async resolve => {
            try {
                let infoUser = await USER_COLL.findById(userID);

                if (!infoUser) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: infoUser });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static updateInfoUserBasic({ userID, fullname, gender, birthDay, phone, address, userUpdate, avatar, updateAt }) {
        return new Promise(async resolve => {
            try {

                console.log({ userID, fullname, gender, birthDay, phone, address, userUpdate, avatar, updateAt })

                if (!ObjectID.isValid(userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    fullname, 
                    gender, 
                    birthDay, 
                    phone, 
                    address,
                    userUpdate,
                    updateAt: Date.now(),
                }

                if(avatar){
                    dataUpdate.avatar = avatar;
                }
                
                let infoAfterUpdate = await USER_COLL.findByIdAndUpdate(userID, dataUpdate, { new: true });
                
                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static changeEmail({ userID, password, email }) {
        return new Promise(async resolve => {
            try {

                console.log({ userID, email, password })

                if (!ObjectID.isValid(userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoUser = await USER_COLL.findById(userID)

                if (!infoUser)
                    return resolve({ error: true, message: 'email_not_exist' });

                const checkPass = await compare(password, infoUser.password);

                let dataUpdate = {
                    email
                }
                
                if (!checkPass)
                    return resolve({ error: true, message: 'password_not_true' });

                else{

                    let infoAfterUpdate = await USER_COLL.findByIdAndUpdate(userID, dataUpdate, { new: true });
                
                    if (!infoAfterUpdate)
                        return resolve({ error: true, message: 'cannot_update_data' });

                    return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });
                }

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static changePassword({ userID, passwordOld, passwordNew }) {
        return new Promise(async resolve => {
            try {

                console.log({ userID, passwordOld, passwordNew })

                if (!ObjectID.isValid(userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoUser = await USER_COLL.findById(userID)

                if (!infoUser)
                    return resolve({ error: true, message: 'email_not_exist' });

                let hashPassword = await hash(passwordNew, 8);

                let dataUpdate = {
                    
                    password: hashPassword
                }

                const checkPass = await compare(passwordOld, infoUser.password);
                
                if (!checkPass)
                    return resolve({ error: true, message: 'password_not_true' });

                else{

                    let infoAfterUpdate = await USER_COLL.findByIdAndUpdate(userID, dataUpdate, { new: true });
                
                    if (!infoAfterUpdate)
                        return resolve({ error: true, message: 'cannot_update_data' });

                    return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });
                }

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}