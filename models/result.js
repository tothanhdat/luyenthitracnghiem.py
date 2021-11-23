const ObjectID = require('mongoose').Types.ObjectId;
const RESULT_COLL = require('../database/result-coll');
const USER_COLL = require('../database/user-coll');
const EXAM_COLL = require('../database/exam-coll');

module.exports = class Result extends RESULT_COLL {

    static insert({ point, falseArr, trueArr, examID, unfinishQuestion, userID }) {
        return new Promise(async resolve => {
            try {

                if (!point || !ObjectID.isValid(examID) || !ObjectID.isValid(userID))
                return resolve({ error: true, message: 'params_invalid' });

                let dataInsert = { 
                    point,
                    falseArr,
                    trueArr,
                    unfinishQuestion,
                    author: userID
                };
                

                if(examID && ObjectID.isValid(examID)){
                    dataInsert.exam = examID;
                }
                //console.log(`dataInsert: ${dataInsert}`)

                let infoAfterInsert = new RESULT_COLL(dataInsert);
                //console.log(`infoAfterInsert: ${infoAfterInsert}`);
                
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_point' });
                resolve({ error: false, data: infoAfterInsert });

                let arrResultOfExam = await EXAM_COLL.findByIdAndUpdate(examID, {
                    $push: { result: infoAfterInsert._id }
                }, {new: true})

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }   

    //DANH SÁCH KẾT QUẢ
    static getList() {
        return new Promise(async resolve => {
            try {
                let listResult = await RESULT_COLL.find()
                .populate({
                    path: 'author'
                })
                .populate({
                    path: 'exam',
                    populate: {
                        path: 'subject'
                    }
                }).sort({ createAt: -1 })

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

                let infoResult = await RESULT_COLL.findById(resultID).populate('author exam subject');

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

    static update({ resultID, point, falseArr, trueArr, examID, userID, unfinishQuestion }) {
        return new Promise(async resolve => {
            try {

                //console.log({ resultID, name, description, subjectID, level })

                if (!ObjectID.isValid(resultID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    point, 
                    examID,
                    falseArr,
                    trueArr,
                    unfinishQuestion,
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
    static searchResultAll({ examID }) {
        return new Promise(async resolve => {
            try {

                let conditionObj = {};

                // if(key && key.length > 0){
                //     let keyword = key.split(" ");
                //     keyword = '.*' + keyword.join(".*") + '.*';
                //     conditionObj.author.fullname = new RegExp(keyword, 'i');
                // }

                if(examID && ObjectID.isValid(examID)){
                    conditionObj.exam = examID;
                }

                // if(ObjectID.isValid(author)){
                //     conditionObj.author = ObjectID(author);
                // }

                let listResult = await RESULT_COLL.aggregate([
                    {
                        $match: conditionObj
                    }, 

                    {
                        $lookup: {
                            from: 'exams',
                            localField: 'exam',
                            foreignField: '_id',
                            as:         'exam'
                        }
                    }, 
                    {
                        $unwind : "$exam"
                    }, 

                    // {
                    //     $lookup: {
                    //         from: 'users',
                    //         localField: 'author',
                    //         foreignField: 'fullname',
                    //         as:         'author'
                    //     }
                    // }, 
                    // {
                    //     $unwind : "$author"
                    // }, 
                    
                ]);
                //console.log("===========")
                //console.log({ listResult })

                if (!listResult) return resolve({ error: true, message: 'cannot_get_list_result' });
                return resolve({ error: false, data: listResult, message: "success" });

                

        } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getListStudentInResultByKey({ examID, key }){
        return new Promise(async resolve => {
            try {
                let objCondition = {};

                if (ObjectID.isValid(examID)){
                    objCondition._id = ObjectID(examID)
                }

                let infoExam = await EXAM_COLL.aggregate([
                    
                    {
                        $match: objCondition,
                    },

                    {
                        $lookup: {
                            from: 'results',
                            localField: 'result',
                            foreignField: '_id',
                            as:         'result'
                        }
                    }, 
                    {
                        $unwind : "$result"
                    }, 
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'result.author',
                            foreignField: '_id',
                            as:         'result.author'
                        }
                    }, 
                    {
                        $unwind : "$result.author"
                    },

                    {
                        $lookup: {
                            from: 'exams',
                            localField: 'result.exam',
                            foreignField: '_id',
                            as:         'result.exam'
                        }
                    }, 
                    {
                        $unwind : "$result.exam"
                    },


                    {
                        $match: {
                            'result.author.fullname' : new RegExp(key, 'i')
                        }
                    },

                    {
                        $sort : { createAt: -1 }
                    }
                    
                ]);


                //console.log({ infoExam });
                
                return resolve({ error: false, data: infoExam })
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
}