const jwt               = require('./jwt.js');
const moment            = require('moment');
const EXAM_MODEL        = require('../models/exam');
const SUBJECT_MODEL     = require('../models/subjects');
const USER_MODEL        = require('../models/users');
const QUESTION_MODEL    = require('../models/question');
const COMMENT_MODEL     = require('../models/comment');
const RESULT_MODEL      = require('../models/result');


const { LEVEL_TYPES }   = require('../config/constants/cf_constants');

let renderToView = async function(req, res, view, data) {
    let { token } = req.session;

    let { page }  = req.query;
    let perPage = 5;
    let listExamPagination = await EXAM_MODEL.listExamPagination({ page, perPage })


    let listSubject = await SUBJECT_MODEL.getList();
    let listExemLimit = await EXAM_MODEL.getListSideBar();
    let listExam = await EXAM_MODEL.getList();
    let listUser = await USER_MODEL.getList();
    let listQuestion = await QUESTION_MODEL.getList();
    let listComment = await COMMENT_MODEL.getList();
    let listResult = await RESULT_MODEL.getList();

    if(token) {
        let user = await jwt.verify(token);
        data.infoUser = user.data;
        
    } else {
        data.infoUser = undefined;
    }

    data.moment                 = moment;
    data.page                   = page;
    data.listExam               = listExam.data;
    data.listSubject            = listSubject.data;
    data.listExemLimit          = listExemLimit.data;
    data.listUser               = listUser.data;
    data.listQuestion           = listQuestion.data;
    data.listComment            = listComment.data;
    data.listResult             = listResult.data;
    data.listExamPagination     = listExamPagination.data;
    data.LEVEL_TYPES            = LEVEL_TYPES;

    return res.render(view, data);
}
exports.renderToView = renderToView;