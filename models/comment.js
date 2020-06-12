const ObjectID = require('mongoose').Types.ObjectId;
const EXAM_COLL = require('../database/exam-coll');
const COMMENT_COLL = require('../database/comment-coll');

module.exports = class Comment extends COMMENT_COLL {

    static insert({ author, content, examID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(author, examID) || !content)
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterInsert = new COMMENT_COLL({ content, author, exam: examID });
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_comment' });
                resolve({ error: false, data: infoAfterInsert });

                let saveCommentToExam = await EXAM_COLL.findByIdAndUpdate(examID, {
                    $addToSet: { comments: infoAfterInsert._id }
                }, {new: true})

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listComment = await COMMENT_COLL.find().populate('author exam');

                if (!listComment) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listComment });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ commentID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(commentID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoComment = await COMMENT_COLL.findById(commentID).populate('author');

                if (!infoComment) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoComment });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ commentID, examID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(commentID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await COMMENT_COLL.findByIdAndDelete(commentID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                let removeCommentToExam = await EXAM_COLL.findByIdAndUpdate(examID, {
                    $pull: { comments: commentID }
                }, {new: true})

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    
}