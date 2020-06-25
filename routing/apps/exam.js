const route             = require('express').Router();
const EXAM_MODEL        = require('../../models/exam');
const USER_MODEL        = require('../../models/users');
const SUBJECT_MODEL     = require('../../models/subjects');
const COMMENT_MODEL     = require('../../models/comment');
const { uploadMulter }  = require('../../utils/config_multer');
const ROLE_ADMIN        = require('../../utils/checkRole');
const ROLE_SUPER_ADMIN  = require('../../utils/roleSuperAdmin');
const checkActive       = require('../../utils/checkActive');
const { renderToView }  = require('../../utils/childRouting');

const fs                = require('fs');
const path              = require('path');

//TRANG BẮT ĐẦU LÀM BỘ ĐỀ
route.get('/', checkActive, async (req, res) => {
    let infoUser = req.session
    let { examID } = req.query;
    let infoExam = await EXAM_MODEL.getInfo({ examID, userID: infoUser.user.infoUSer._id })
    renderToView(req, res, 'pages/begin-exam', {  infoExam: infoExam.data, userID: infoUser.user.infoUSer });
})

route.get('/test-exam', checkActive, async (req, res) => {
    let { examID } = req.query;
    let infoExam = await EXAM_MODEL.getInfo({ examID })

    renderToView(req, res, 'pages/test-exam', {  examID, infoExam: infoExam.data });
})

route.get('/result', checkActive, async (req, res) => {
    
    renderToView(req, res, 'pages/result-test-exam', { });
})

route.post('/add-exam', uploadMulter.single('file'), ROLE_ADMIN, async (req, res) => {

    let userIDfromSession = req.session; //Đã gán req.session.user
    let userID = userIDfromSession.user.infoUSer._id;

    let { name, description, level, timeDoTest, subjectID } = req.body;
    
    let infoFile = req.file;

    let resultInsert

    if(infoFile){
        resultInsert = await EXAM_MODEL.insert({ name, description, level, timeDoTest, subjectID, file: infoFile.originalname, createAt: Date.now(), userID });
    } else{
        resultInsert = await EXAM_MODEL.insert({ name, description, level, timeDoTest, subjectID, createAt: Date.now(), userID });
    }

    return res.json(resultInsert);
})

//Danh sách bộ đề
route.get('/list-exam', ROLE_ADMIN, async (req, res) => {
    let listExam = await EXAM_MODEL.getList();
    return res.json(listExam);
})

//Danh sách bộ đề theo lớp
route.get('/list-exam-with-level', async (req, res) => {
    let { subjectID, level } = req.query;
    let listExamWithLevel = await EXAM_MODEL.getListExamWithLevel({ subjectID, level });
    //return res.json(listExamWithLevel);
    renderToView(req, res, 'pages/list-exam-of-level', { listExamWithLevel: listExamWithLevel.data });
})


route.get('/info-exam/:examID', checkActive, async (req, res) => {
    let { examID } = req.params;

    // Kiểm tra quyền/check về logic (nếu có)
        
    let infoExam = await EXAM_MODEL.getInfo({ examID });
    return res.json(infoExam);
})

route.post('/update-exam/:examID', uploadMulter.single('file'), ROLE_ADMIN, async (req, res) => {
    let userIDfromSession = req.session; //Đã gán req.session.user
    let userUpdate = userIDfromSession.user.infoUSer._id;
    let { examID } = req.params;
    let { name, description, level, subjectID, timeDoTest } = req.body;

    let infoFile = req.file;
    
    let resultUpdate;

    if(infoFile){
        resultUpdate = await EXAM_MODEL.update({ userUpdate, name, description, level, timeDoTest, subjectID, file: infoFile.originalname, examID, createAt: Date.now()});
    }else{
        resultUpdate = await EXAM_MODEL.update({ userUpdate, name, description, level, timeDoTest, subjectID, examID, createAt: Date.now()});
    }

    return res.json(resultUpdate);
})

route.get('/remove-exam/:examID', ROLE_ADMIN, async (req, res) => {
    let { examID } = req.params;
    let resultRemove = await EXAM_MODEL.remove({ examID });

    let pathOrigin = path.resolve(__dirname, `../../public/storage/images/${resultRemove.data.file}`);

    fs.unlink(pathOrigin, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
    });

    res.json(resultRemove);
})

route.post('/save-exam', checkActive, async (req, res) => {
    let { examID } = req.body;
    let infoUser = req.session;
    let examBySave = await EXAM_MODEL.saveExam({ examID, userID: infoUser.user.infoUSer._id })
    res.json(examBySave);
})

route.post('/cancle-save-exam', checkActive, async (req, res) => {
    let { examID } = req.body;
    let infoUser = req.session;
    let cancelSaveExam = await EXAM_MODEL.cancelSaveExam({ examID, userID: infoUser.user.infoUSer._id })
    res.json(cancelSaveExam);
})



module.exports = route;