const route         = require('express').Router();
const USER_MODEL    = require('../../models/users');
const SUBJECT_MODEL = require('../../models/subjects');
const EXAM_MODEL    = require('../../models/exam');

const ROLE_ADMIN        = require('../../utils/checkRole');
const { LEVEL_TYPES }   = require('../../config/constants/cf_constants');
const { renderToView }  = require('../../utils/childRouting');

route.get('/', (req, res) => {
    res.render('pages/login-admin');
})

route.get('/create-subject', ROLE_ADMIN, async (req, res) => {
    let listSubject = await SUBJECT_MODEL.getList();
    renderToView(req, res, 'pages/add-subject', { listSubject: listSubject.data })
})  

route.get('/create-exam', ROLE_ADMIN, async (req, res) => {
    let listSubject = await SUBJECT_MODEL.getList();
    let listExam = await EXAM_MODEL.getList();
    renderToView(req, res, 'pages/add-exam', { LEVEL_TYPES, listSubject: listSubject.data, listExam: listExam.data })
})

route.get('/create-question', ROLE_ADMIN, async (req, res) => {
    let listSubject = await SUBJECT_MODEL.getList();
    let listExam = await EXAM_MODEL.getList();
    renderToView(req, res, 'pages/add-question', { LEVEL_TYPES, listSubject: listSubject.data, listExam: listExam.data })
})

route.get('/dashboard', ROLE_ADMIN, (req, res) => {
    res.render('pages/dashboard-admin');
})

route.get('/home', async (req, res) => {
    renderToView(req, res, 'pages/home', { })
})

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

route.get('/logout', async (req, res) => {
    req.session.token = undefined;
    res.redirect('/');
})

module.exports = route;