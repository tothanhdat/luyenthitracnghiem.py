const ObjectID = require('mongoose').Types.ObjectId;
const SUBJECTS_COLL = require('../database/subject-coll');

module.exports = class Subjects extends SUBJECTS_COLL {

    static insert({ name, teacher }) {
        return new Promise(async resolve => {
            try {

                if (!name)
                    return resolve({ error: true, message: 'params_invalid' });

                let checkExist = await SUBJECTS_COLL.findOne({ name });
                if (checkExist) return resolve ({ error: true, message: 'subject_existed'});

                let infoAfterInsert = new SUBJECTS_COLL({ name, teacher });
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_subject' });
                resolve({ error: false, data: infoAfterInsert });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listSubject = await SUBJECTS_COLL.find();

                if (!listSubject) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listSubject });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ subjectID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(subjectID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoSubject = await SUBJECTS_COLL.findById(subjectID);

                if (!infoSubject) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoSubject });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ subjectID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(subjectID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await SUBJECTS_COLL.findByIdAndDelete(subjectID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ subjectID, name, teacher }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(subjectID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterUpdate = await SUBJECTS_COLL.findByIdAndUpdate(subjectID, { name, teacher } , 
                { new: true });
                
                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}