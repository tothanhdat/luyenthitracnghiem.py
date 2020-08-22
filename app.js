const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const expressSession    = require('express-session');
const redis             = require("redis");
const connectRedis      = require('connect-redis');

const RedisStore = connectRedis(expressSession);

const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
});

const passport          = require('passport');

const USER_ROUTER       = require('./routing/apps/user');
const SUBJECT_ROUTER    = require('./routing/apps/subject');
const EXAM_ROUTER       = require('./routing/apps/exam');
const QUESTION_ROUTER   = require('./routing/apps/question');
const COMMENT_ROUTER    = require('./routing/apps/comment');
const { session } = require('passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// app.use(expressSession({
//     //store: new RedisStore({client: redisClient}),
//     secret: 'lueynthitracnghiem.py',
//     saveUninitialized: true,
//     resave: true,
//     cookie: {
//         maxAge: 10 * 60 * 1000 * 100
//     }
// }))

app.use(expressSession({
    store: new RedisStore({client: redisClient}),
    secret: 'luyenthitracnghiem.py',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 10 * 60 * 1000 * 100
    }
}));

app.use(passport.initialize());
app.use(passport.session());

require('./models/passport')(passport)

app.use('/', USER_ROUTER);
app.use('/subject', SUBJECT_ROUTER);
app.use('/exam', EXAM_ROUTER);
app.use('/question', QUESTION_ROUTER);
app.use('/comment', COMMENT_ROUTER);



// app.get('/logout', function(req, res){
//     req.logout();
//     res.redirect('/');
// });

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//     User.findOne({id}, (err, user) => {
//         done(null, user)
//     })
// })

app.use((req, res, next) => {
    if(!req.session || req.session.token){
        const err = new Error('You shall not pass');
        err.stautsCode = 401;
        next(err)
    }
    next();
});

app.get('/profile', (req, res) => {
    res.json(req.session)
});

//Dẫn đến page 404
app.use(function(req, res, next){
    res.status(404).render('pages/page-404', {title: "Sorry, page not found"});
});

const uri = 'mongodb://localhost/luyenthitracnghiempy';
//const uri = 'mongodb://datchen:datchen123@ds261238.mlab.com:61238/lttn-py';
//const uri = 'mongodb+srv://datchen:datchen123@cluster0-mbx1o.mongodb.net/test';

const PORT = process.env.PORT || 3000;

mongoose.set('useCreateIndex', true); //ẩn cảnh báo
mongoose.set('useUnifiedTopology', true); // ẩn cảnh báo

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
});