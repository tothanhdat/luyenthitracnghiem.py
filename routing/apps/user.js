const route             = require('express').Router();
const USER_MODEL        = require('../../models/users');
const EXAM_MODEL        = require('../../models/exam');
const RESULT_MODEL      = require('../../models/result');
const { uploadMulter }  = require('../../utils/config_multer');
const passport          = require('passport');
const ROLE_ADMIN        = require('../../utils/checkRole');
const ROLE_SUPER_ADMIN  = require('../../utils/roleSuperAdmin');

const checkActive       = require('../../utils/checkActive');
const { renderToView }  = require('../../utils/childRouting');

route.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    // xử lý sau khi user cho phép xác thực với facebook
route.get('/auth/facebook/callback',
    
    passport.authenticate('facebook', {
        
        successRedirect: '/',
        failureRedirect: '/'
    })
);

route.get('/', async (req, res) => {
    renderToView(req, res, 'pages/home', { })
})

//Thông tin user
route.get('/info-user', async (req, res) => {
    let userIDfromSession = req.session; //Đã gán req.session.user
    let authorID = userIDfromSession.user.infoUSer._id;
    let { userID } = req.query;
    if(authorID.toString() == userID.toString()){
        let infoUserDb = await USER_MODEL.getInfo(userID);
        renderToView(req, res, 'pages/info-user', { infoUserDb: infoUserDb.data })
    }else{
        res.json("Không được phép vào");
    }
    
})

//Chỉnh sửa Thông tin user
route.get('/edit-info-user', async (req, res) => {
    let userIDfromSession = req.session; //Đã gán req.session.user
    let authorID = userIDfromSession.user.infoUSer._id;

    let { userID } = req.query;
    if(authorID.toString() == userID.toString()){
        let infoUserDb = await USER_MODEL.getInfo(userID);
        renderToView(req, res, 'pages/edit-info-user', { infoUserDb: infoUserDb.data })
    }else{
        res.json("Không được phép vào")
    }
    
})

route.post('/edit-info-user', uploadMulter.single('avatar'), checkActive, async (req, res) => {
    let userIDfromSession = req.session; //Đã gán req.session.user
    let userUpdate = userIDfromSession.user.infoUSer._id;
    let { userID } = req.query;

    let { fullname, gender, birthDay, phone, address } = req.body;

    let infoFile = req.file;

    let resultUpdate;

    if(infoFile){
        resultUpdate = await USER_MODEL.updateInfoUserBasic({ userID, fullname, gender, birthDay, phone, address, userUpdate, avatar: infoFile.originalname, updateAt: Date.now() });
    }else{
        resultUpdate = await USER_MODEL.updateInfoUserBasic({ userID, fullname, gender, birthDay, phone, address, userUpdate, updateAt: Date.now() });
    }
    return res.json(resultUpdate);
})


//TẠO MÔN HỌC
route.get('/create-subject', ROLE_SUPER_ADMIN, async (req, res) => {
    renderToView(req, res, 'pages/add-subject', { })
})  

//TẠO BỘ ĐỀ
route.get('/create-exam', ROLE_ADMIN, async (req, res) => {
    renderToView(req, res, 'pages/add-exam', { })
})

//TẠO CÂU HỎI
route.get('/create-question', ROLE_ADMIN, async (req, res) => {
    renderToView(req, res, 'pages/add-question', { })
})

//TRANG DASHBOARD
route.get('/dashboard', ROLE_ADMIN, async (req, res) => {
    renderToView(req, res, 'pages/dashboard-admin', {  })
})

//TRANG 404
route.get('/page-not-found', async (req, res) => {
    renderToView(req, res, 'pages/page-404', {  })
})

//TRANG CONTACT
route.get('/contact', async (req, res) => {
    renderToView(req, res, 'pages/contact', {  })
})

//TRANG LÀM TRẮC NGHIỆM
route.get('/test-exam', checkActive, async (req, res) => {
    let { examID } = req.query;
    let infoExam = await EXAM_MODEL.getInfo({ examID })
    renderToView(req, res, 'pages/test-exam', {  infoExam: infoExam.data });
})

//TRANG KẾT QUẢ  ==========>
route.get('/result-exam', checkActive, async (req, res) => {
    let { resultID } = req.query;
    let { examID } = req.query;
    //console.log(resultID, examID)
    let infoResult = await RESULT_MODEL.getInfo({ resultID })
    let infoExam = await EXAM_MODEL.getInfo({ examID })
    renderToView(req, res, 'pages/result-test-exam', { infoResult: infoResult.data, infoExam: infoExam.data });
})

route.post('/result-exam', checkActive, async (req, res) => {

    let userID = req.session.user._id;

    let { point, falseArr, trueArr, examID, unfinishQuestion } = req.body;

    //console.log({ point, falseArr, trueArr, userID, examID })

    // Kiểm tra quyền/check về logic (nếu có)

    // Thực hiện hành động sau khi đã check logic
    let resultInsert = await RESULT_MODEL.insert({ point, falseArr, trueArr, examID, unfinishQuestion, createAt: Date.now(), userID });
    return res.json(resultInsert);

})

route.get('/list-result-exam', ROLE_ADMIN, async (req, res) => {
    renderToView(req, res, 'pages/list-result-exam', { });
})

// route.get('/list-result-exam?sort', ROLE_ADMIN, async (req, res) => {
//     renderToView(req, res, 'pages/home', { });
// })


//<==========================

//TRANG DANH SÁCH BỘ ĐỀ THEO MÔN HỌC
route.get('/list-of-subjects', async (req, res) => {
    let { subjectID } = req.query;
    let listExamOfSubject = await EXAM_MODEL.getListOfSubjects({ subjectID });
    //console.log( listExamOfSubject.data )
    renderToView(req, res, 'pages/list-exam-of-subject', {  subjectID, listExamOfSubject: listExamOfSubject.data });
})

//TRANG DANH SÁCH BỘ ĐỀ THEO LỚP
route.get('/list-exam-with-level', async (req, res) => {
    let { subjectID, level } = req.query;
    let listExamWithLevel = await EXAM_MODEL.getListExamWithLevel({ subjectID, level });
    //return res.json(listExamWithLevel);
    renderToView(req, res, 'pages/list-exam-of-level', { listExamWithLevel: listExamWithLevel.data });
})

//Danh sách đề thi đã lưu
route.get('/list-exam-by-save', checkActive, async (req, res) => {
    let infoUser = req.session;
    let listExamBySave = await EXAM_MODEL.getList();
    renderToView(req, res, 'pages/list-exam-by-save', { listExamBySave: listExamBySave.data, userID: infoUser.user.infoUSer._id });
})

//lịch sử thi
route.get('/history-test', checkActive, async (req, res) => {
    let userID = req.session.user._id;
    //listResult
    renderToView(req, res, 'pages/history-test', { userID });
})

route.get('/list-exam', async (req, res) => {
    //console.log( listExamOfSubject.data )
    renderToView(req, res, 'pages/list-exam', { });
})

route.get('/info-exam', async (req, res) => {
    //console.log( listExamOfSubject.data )
    let { examID } = req.query;
    let infoExamHaveQuestion = await EXAM_MODEL.getInfo({ examID })
    //console.log(infoExamHaveQuestion)
    renderToView(req, res, 'pages/info-exam', { infoExamHaveQuestion: infoExamHaveQuestion.data });
})

//Tìm kiếm theo key và bộ đề
route.post('/list-result-of-search', async (req, res) => {
    let { key, examID } = req.body;
    let listResultOfSearch = await RESULT_MODEL.getListStudentInResultByKey({ key, examID });
    //console.log({ listResultOfSearch });
    res.json(listResultOfSearch);
})


//TRANG ĐĂNG KÝ
route.get('/register', async (req, res) => {
    renderToView(req, res, 'pages/register', { })
})

route.post('/register', async (req, res) => {
    let { email, password, fullname } = req.body;
    let infoUser = await USER_MODEL.register(email, password, fullname);
    res.json(infoUser)
});

//TRANG ĐĂNG NHẬP
route.post('/login', async (req, res) => {
    //req.session.isLogin = true;
    let { email, password } = req.body;
    let infoUser = await USER_MODEL.signIn(email, password);

    console.log({ infoUser });

    if(!infoUser.error){
        req.session.token = infoUser.data.token; //gán token đã tạo cho session
        req.session.email = req.body.email;
        req.session.user = infoUser.data.infoUser;
        req.user = infoUser.data.infoUser;
    }

    return res.json(infoUser)
    //renderToView(req, res, 'pages/dashboard-admin', { infoUser: infoUser.data })
})

//Đổi email
route.post('/change-email', async (req, res) => {

    let { email, password, userID } = req.body;
    let infoUser = await USER_MODEL.changeEmail({ userID, email, password });

    console.log({ infoUser })

    if(infoUser.error)
        return res.json(infoUser);

    return res.json(infoUser);
    
})

//Đổi mat khau
route.post('/change-password', async (req, res) => {

    let { passwordOld, passwordNew, userID } = req.body;
    let infoUser = await USER_MODEL.changePassword({ userID, passwordOld, passwordNew });

    console.log({ infoUser })

    if(infoUser.error)
        return res.json(infoUser);

    return res.json(infoUser);
    
})

//ĐĂNG XUẤT
route.get('/logout', async (req, res) => {
    req.session.token = undefined;
    return res.redirect('/');
})

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     res.redirect('/login')
// }


module.exports = route;