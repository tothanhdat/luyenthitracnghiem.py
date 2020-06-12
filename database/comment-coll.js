const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

    /**
     * Nội dung
     */
    content: String,

    createAt: { type: Date, required: true, default: Date.now },

    exam: {
        type: Schema.Types.ObjectId,
        ref : "exam"
    },

    like: [{
        type: Schema.Types.ObjectId,
        ref : "user"
    }]
    
});

const COMMENT_MODEL = mongoose.model('comment', commentSchema);
module.exports  = COMMENT_MODEL;