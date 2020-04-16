const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const QuestionSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },
    
    /**
     * Tên
     */
    name: String,

    /**
     * Cau tra loi
     */
    answer: [{
        type: String,
    }],

    /**
     * Bo de
     */
    exam: {
        type: Schema.Types.ObjectId,
        ref: "exam",
    },
    
    image: String,

    point: String,

    correct: Number,
});

const QUESTION_MODEL = mongoose.model('question', QuestionSchema);
module.exports  = QUESTION_MODEL;