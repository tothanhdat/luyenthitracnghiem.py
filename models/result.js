const ObjectID = require('mongoose').Types.ObjectId;
const RESULT_COLL = require('../database/result-coll');

module.exports = class Result extends RESULT_COLL {

    static insert({ point, examID, userID }) {
        return new Promise(async resolve => {
            try {

                if (!point || !ObjectID.isValid(examID) || !ObjectID.isValid(userID))
                return resolve({ error: true, message: 'params_invalid' });

                let dataInsert = { 
                    point,
                    author: userID
                };
                

                if(examID && ObjectID.isValid(examID)){
                    dataInsert.exam = examID;
                }

                let infoAfterInsert = new RESULT_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_point' });
                resolve({ error: false, data: infoAfterInsert });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }   

    //DANH SÁCH KẾT QUẢ
    static getList() {
        return new Promise(async resolve => {
            try {
                let listResult = await RESULT_COLL.find().sort({ createAt: -1 });

                if (!listResult) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listResult });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }
    

    static getInfo({ resultID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(resultID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoResult = await RESULT_COLL.findById(resultID);

                if (!infoResult) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoResult });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ resultID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(resultID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await RESULT_COLL.findByIdAndDelete(resultID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ resultID, point, examID, userID }) {
        return new Promise(async resolve => {
            try {

                //console.log({ resultID, name, description, subjectID, level })

                if (!ObjectID.isValid(resultID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    point, 
                    examID, 
                    userUpdate: userID
                }
                
                let infoAfterUpdate = await RESULT_COLL.findByIdAndUpdate(resultID, dataUpdate, { new: true });
                
                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}