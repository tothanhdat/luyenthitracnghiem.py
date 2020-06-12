const route             = require('express').Router();
const EXAM_MODEL        = require('../../models/exam');
const COMMENT_MODEL        = require('../../models/comment');
const USER_MODEL        = require('../../models/users');
const checkActive       = require('../../utils/checkActive');
const { renderToView }  = require('../../utils/childRouting');

route.post('/add-comment', checkActive, async (req, res) => {
    let infoUser = req.session
    let { examID, content } = req.body;
    let infoComment = await COMMENT_MODEL.insert({ examID, content, author: infoUser.user.infoUSer._id })
    res.json(infoComment)
})

route.post('/remove-comment', checkActive, async (req, res) => {
    let { commentID, examID } = req.body;
    let infoCommentRemove = await COMMENT_MODEL.remove({ commentID, examID })
    res.json(infoCommentRemove)
})

module.exports = route;