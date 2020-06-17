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
}