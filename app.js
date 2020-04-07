const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const expressSession    = require('express-session');

const USER_ROUTER       = require('./routing/apps/user');
const SUBJECT_ROUTER       = require('./routing/apps/subject');
const EXAM_ROUTER       = require('./routing/apps/exam');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressSession({
    secret: 'lueynthitracnghiem.py',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 10 * 60 * 1000 * 100
    }
}))

app.use('/', USER_ROUTER);
app.use('/subject', SUBJECT_ROUTER);
app.use('/exam', EXAM_ROUTER);
// app.use('/san-pham', PRODUCT_ROUTER);
// app.use('/danh-muc', CATEGORY_ROUTER);




const uri = 'mongodb://localhost/luyenthitracnghiempy';
const PORT = process.env.PORT || 3000;

mongoose.set('useCreateIndex', true); //ẩn cảnh báo
mongoose.set('useUnifiedTopology', true); // ẩn cảnh báo

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});