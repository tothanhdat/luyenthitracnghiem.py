const jwt = require('./jwt.js');
const moment        = require('moment');
const EXAM_MODEL        = require('../models/exam');
const SUBJECT_MODEL     = require('../models/subjects');
const { LEVEL_TYPES }   = require('../config/constants/cf_constants');

let renderToView = async function(req, res, view, data) {
    let { token } = req.session;
    let user = await jwt.verify(token);

    let listSubject = await SUBJECT_MODEL.getList();
    let listExam = await EXAM_MODEL.getList();

    data.infoUser = user.data;
    data.moment = moment;
    data.listExam = listExam.data;
    data.listSubject = listSubject.data;
    data.LEVEL_TYPES = LEVEL_TYPES;

    res.render(view, data);
}
exports.renderToView = renderToView;