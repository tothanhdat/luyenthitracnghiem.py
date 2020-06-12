const ObjectID = require('mongoose').Types.ObjectId;
const EXAM_COLL = require('../database/exam-coll');

module.exports = class Exam extends EXAM_COLL {

    static insert({ name, description, subjectID, level, timeDoTest, createAt, userID }) {
        return new Promise(async resolve => {
            try {

                if (!name || isNaN(Number(level)) || !ObjectID.isValid(userID))
                return resolve({ error: true, message: 'params_invalid' });

                let dataInsert = { 
                    name,
                    description,
                    timeDoTest,
                    level,
                    createAt,
                    author: userID
                };
                

                if(subjectID && ObjectID.isValid(subjectID)){
                    dataInsert.subjects = subjectID;
                }

                let infoAfterInsert = new EXAM_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_exam' });
                resolve({ error: false, data: infoAfterInsert });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listExam = await EXAM_COLL.find().populate("subjects author").sort({ createAt: -1 }).limit(5);

                if (!listExam) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listExam });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static listExamPagination({ page, perPage }){ 
        return new Promise(async resolve => {
            try {
                let listExam = await EXAM_COLL.find().populate("subjects author").sort({ createAt: -1 })
                    .skip((perPage * page) - perPage)
                    .limit(perPage)

                    return resolve({ error: false, data: listExam });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getListSideBar() {
        return new Promise(async resolve => {
            try {
                let listExam = await EXAM_COLL.find().populate("subjects author").sort({ createAt: -1 }).limit(3);

                if (!listExam) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listExam });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }
    
    //Danh sách bộ đề theo môn học
    static getListOfSubjects({ subjectID }) {
        return new Promise(async resolve => {
            try {
                let listExamOfSubject = await EXAM_COLL.find({ subjects: subjectID })
                .populate('subjects author');

                if (!listExamOfSubject) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listExamOfSubject });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    //Danh sách bộ đề theo lớp
    static getListExamWithLevel({ subjectID, level }) {
        return new Promise(async resolve => {
            try {

                if (isNaN(Number(level)) || !ObjectID.isValid(subjectID))
                return resolve({ error: true, message: 'params_invalid' });

                let listExamWithLevel = await EXAM_COLL.find({ subjects: subjectID, level })
                .populate('subjects author');

                if (!listExamWithLevel) return resolve({ error: true, message: 'cannot_get_list_data' });
                return resolve({ error: false, data: listExamWithLevel });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ examID, userID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(examID, userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoExam = await EXAM_COLL.findById(examID)
                .populate('subjects question user')

                if (!infoExam) return resolve({ error: true, message: 'cannot_get_info_data' });

                let seenOfExam = await EXAM_COLL.findByIdAndUpdate(examID, {
                    $push: { seen: userID }
                }, {new: true})

                return resolve({ error: false, data: infoExam });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ examID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(examID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await EXAM_COLL.findByIdAndDelete(examID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ examID, name, description, subjectID, timeDoTest, level, createAt, userID }) {
        return new Promise(async resolve => {
            try {

                //console.log({ examID, name, description, subjectID, level })

                if (!ObjectID.isValid(examID) || !ObjectID.isValid(subjectID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    name, 
                    description, 
                    subjects: subjectID, 
                    level, 
                    timeDoTest,
                    createAt, 
                    userUpdate: userID
                }
                
                let infoAfterUpdate = await EXAM_COLL.findByIdAndUpdate(examID, dataUpdate, { new: true });
                
                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    //Lưu đề thi
    static saveExam({ examID, userID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(examID, userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoExam = await EXAM_COLL.findById(examID)
                .populate('subjects question user')

                if (!infoExam) return resolve({ error: true, message: 'cannot_get_info_data' });

                let saveExam = await EXAM_COLL.findByIdAndUpdate(examID, {
                    $addToSet: { saveTask: userID }
                }, {new: true})

                return resolve({ error: false, data: saveExam });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}