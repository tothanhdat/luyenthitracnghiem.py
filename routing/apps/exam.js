const route             = require('express').Router();
const EXAM_MODEL        = require('../../models/exam');
const USER_MODEL        = require('../../models/users');
const SUBJECT_MODEL     = require('../../models/subjects');
const ROLE_ADMIN        = require('../../utils/checkRole');
const checkActive       = require('../../utils/checkActive');
const { renderToView }  = require('../../utils/childRouting');

//TRANG BẮT ĐẦU LÀM BỘ ĐỀ
route.get('/', checkActive, async (req, res) => {

    let { examID } = req.query;
    let infoExam = await EXAM_MODEL.getInfo({ examID })
    renderToView(req, res, 'pages/begin-exam', {  infoExam: infoExam.data });
})

route.get('/test-exam', checkActive, async (req, res) => {
    let { examID } = req.query;
    let infoExam = await EXAM_MODEL.getInfo({ examID })

    renderToView(req, res, 'pages/test-exam', {  examID, infoExam: infoExam.data });
})

route.post('/add-exam', ROLE_ADMIN, async (req, res) => {

    let userIDfromSession = req.session; //Đã gán req.session.user
    let userID = userIDfromSession.user.infoUSer._id;
    
    let { name, description, level, subjectID } = req.body;

    // Kiểm tra quyền/check về logic (nếu có)

    // Thực hiện hành động sau khi đã check logic
    let resultInsert = await EXAM_MODEL.insert({ name, description, level, subjectID, createAt: Date.now(), userID });
    return res.json(resultInsert);
})

//Danh sách bộ đề
route.get('/list-exam', ROLE_ADMIN, async (req, res) => {
    let listExam = await EXAM_MODEL.getList();
    return res.json(listExam);
})



route.get('/info-exam/:examID', ROLE_ADMIN, async (req, res) => {
    let { examID } = req.params;
    
    // Kiểm tra quyền/check về logic (nếu có)
        
    let infoExam = await EXAM_MODEL.getInfo({ examID });
    return res.json(infoExam);
})

route.get('/update-exam/:examID', ROLE_ADMIN, async (req, res) => {
    
})

route.post('/update-exam/:examID', ROLE_ADMIN, async (req, res) => {
    let { _id: userUpdate } = req.user;
    let { examID } = req.params;
    let { name, description, level, subjectID } = req.body;

    // Kiểm tra quyền/check về logic (nếu có)

    let resultUpdate = await EXAM_MODEL.update({ userUpdate, name, description, level, subjectID, examID, createAt: Date.now()});
    return res.json(resultUpdate);
})

route.get('/remove-exam/:examID', ROLE_ADMIN, async (req, res) => {
    let { examID } = req.params;
    let resultRemove = await EXAM_MODEL.remove({ examID });
    res.json(resultRemove);
})

module.exports = route;