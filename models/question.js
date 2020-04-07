const ObjectID = require('mongoose').Types.ObjectId;
const QUESTION_COLL = require('../database/question-coll');
const EXAM_COLL = require('../database/exam-coll');

module.exports = class Question extends QUESTION_COLL {

    static insert({ nameQuestion, examID, answer, correct }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(examID))
                    return resolve({ error: true, message: 'params_invalid' });

                let checkExistExamID = await EXAM_COLL.findById(examID)
                if(!checkExistExamID) return resolve({ error: true, message: 'bo_de_khong_ton_tai' });

                let dataInsert = { 
                    nameQuestion,
                    exam: examID,
                    answer,
                    correct,
                    }

                if(examID && ObjectID.isValid(examID)){
                    dataInsert.exam = examID;
                }

                let infoAfterInsert = new QUESTION_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_data' });
                resolve({ error: false, data: infoAfterInsert });

                let arrayExamHaveQuestion = await EXAM_COLL.findByIdAndUpdate(examID, {
                    $push: { question: infoAfterInsert._id }
                }, {new: true})

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listQuestion = await QUESTION_COLL.find();

                if (!listQuestion) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listQuestion });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ questionID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(questionID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoQuestion = await QUESTION_COLL.findById(questionID);

                if (!infoQuestion) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoQuestion });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ questionID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(questionID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await QUESTION_COLL.findByIdAndDelete(questionID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ questionID, nameQuestion, examID, answer, correct }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(questionID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = { nameQuestion, examID, answer, correct };

                let infoAfterUpdate = await QUESTION_COLL.findByIdAndUpdate(questionID, dataUpdate,
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