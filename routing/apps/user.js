const route             = require('express').Router();
const USER_MODEL        = require('../../models/users');
const EXAM_MODEL        = require('../../models/exam');

const ROLE_ADMIN        = require('../../utils/checkRole');
const { renderToView }  = require('../../utils/childRouting');

route.get('/', (req, res) => {
    res.render('pages/login-admin');
})

//TẠO MÔN HỌC
route.get('/create-subject', ROLE_ADMIN, async (req, res) => {
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
route.get('/dashboard', ROLE_ADMIN, (req, res) => {
    renderToView(req, res, 'pages/dashboard-admin', { })
})

//TRANG HOME
route.get('/home', async (req, res) => {
    renderToView(req, res, 'pages/home', {  })
})

route.get('/test-exam', async (req, res) => {
    let { examID } = req.query;
    let infoExam = await EXAM_MODEL.getInfo({ examID })
    renderToView(req, res, 'pages/test-exam', {  infoExam: infoExam.data });
})


//TRANG ĐĂNG KÝ
route.get('/register', async (req, res) => {
    renderToView(req, res, 'pages/register', { })
})

route.post('/register', async (req, res) => {
    let { email, password } = req.body;
    let infoUser = await USER_MODEL.register(email, password);
    if (infoUser.error && infoUser.message == 'email_existed')
        renderToView(req, res, 'pages/home', { });
    return res.redirect('/dang-nhap');
});

//TRANG ĐĂNG NHẬP
route.post('/login', async (req, res) => {
    //req.session.isLogin = true;
    let { email, password } = req.body;
    let infoUser = await USER_MODEL.signIn(email, password);

    if(infoUser.error) 
        return res.json(infoUser);
    
    // res.cookie('token', infoUser.data.token, { maxAge: 900000 });
    req.session.token = infoUser.data.token;
    req.session.email = req.body.email; //gán token đã tạo cho session
    renderToView(req, res, 'pages/dashboard-admin', { infoUser: infoUser.data })
})

//ĐĂNG XUẤT
route.get('/logout', async (req, res) => {
    req.session.token = undefined;
    res.redirect('/');
})

module.exports = route;