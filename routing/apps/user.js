const route             = require('express').Router();
const USER_MODEL        = require('../../models/users');
const EXAM_MODEL        = require('../../models/exam');
const RESULT_MODEL        = require('../../models/result');
const ROLE_ADMIN        = require('../../utils/checkRole');
const ROLE_SUPER_ADMIN  = require('../../utils/roleSuperAdmin');

const checkActive       = require('../../utils/checkActive');
const { renderToView }  = require('../../utils/childRouting');


route.get('', async (req, res) => {
    let { page }  = req.query;
    let perPage = 5;
    console.log('page & perPage', page, perPage)
    let listExamPagination = await EXAM_MODEL.listExamPagination({ page, perPage })
    console.log({ listExamPagination })
    
    renderToView(req, res, 'pages/home', { listExamPagination: listExamPagination.data })
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
    console.log(resultID, examID)
    let infoResult = await RESULT_MODEL.getInfo({ resultID })
    let infoExam = await EXAM_MODEL.getInfo({ examID })
    renderToView(req, res, 'pages/result-test-exam', { infoResult: infoResult.data, infoExam: infoExam.data });
})

route.post('/result-exam', checkActive, async (req, res) => {

    let userIDfromSession = req.session; //Đã gán req.session.user
    let userID = userIDfromSession.user.infoUSer._id;

    let { point, falseArr, trueArr, examID,unfinishQuestion } = req.body;

    console.log({ point, falseArr, trueArr, userID, examID })

    // Kiểm tra quyền/check về logic (nếu có)

    // Thực hiện hành động sau khi đã check logic
    let resultInsert = await RESULT_MODEL.insert({ point, falseArr, trueArr, examID, unfinishQuestion, createAt: Date.now(), userID });
    return res.json(resultInsert);

})

route.get('/list-result-exam', ROLE_ADMIN, async (req, res) => {
    let listResult = await RESULT_MODEL.getList();
    renderToView(req, res, 'pages/list-result-exam', { listResult: listResult.data });
})
//<==========================

//TRANG DANH SÁCH BỘ ĐỀ THEO MÔN HỌC
route.get('/list-of-subjects', async (req, res) => {
    let { subjectID } = req.query;
    let listExamOfSubject = await EXAM_MODEL.getListOfSubjects({ subjectID });
    console.log( listExamOfSubject.data )
    renderToView(req, res, 'pages/list-exam-of-subject', {  subjectID, listExamOfSubject: listExamOfSubject.data });
})


//TRANG ĐĂNG KÝ
route.get('/register', async (req, res) => {
    renderToView(req, res, 'pages/register', { })
})

route.post('/register', async (req, res) => {
    let { email, password, fullname } = req.body;
    let infoUser = await USER_MODEL.register(email, password, fullname);
    if (infoUser.error && infoUser.message == 'email_existed')
        renderToView(req, res, 'pages/home', { });
    return res.redirect('/register');
});

//TRANG ĐĂNG NHẬP
route.post('/login', async (req, res) => {
    //req.session.isLogin = true;
    let { email, password } = req.body;
    let infoUser = await USER_MODEL.signIn(email, password);

    if(infoUser.error)
        return res.json(infoUser);
    
    // res.cookie('token', infoUser.data.token, { maxAge: 900000 });
    req.session.token = infoUser.data.token; //gán token đã tạo cho session
    req.session.email = req.body.email; 
    req.session.user = infoUser.data; 

    renderToView(req, res, 'pages/dashboard-admin', { infoUser: infoUser.data })
})

//ĐĂNG XUẤT
route.get('/logout', async (req, res) => {
    req.session.token = undefined;
    return res.redirect('/');
})


module.exports = route;