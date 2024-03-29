const route             = require('express').Router();
const QUESTION_MODEL    = require('../../models/question');
const EXAM_MODEL        = require('../../models/exam');
const ROLE_ADMIN        = require('../../utils/checkRole');
const { uploadMulter }  = require('../../utils/config_multer');
const fs                = require('fs');
const path              = require('path');

route.post('/add-question', uploadMulter.single('image'), ROLE_ADMIN, async (req, res) => {
    try {
        let userID = req.session.user._id;

        let { nameQuestion, examID, answer, correct } = req.body;
        
        let infoFile = req.file;
        
        let infoQuestion;

        if(infoFile) {

            infoQuestion = await QUESTION_MODEL.insert({ nameQuestion, examID, answer, correct, image: infoFile.originalname, userID });
        
        } else {

            infoQuestion = await QUESTION_MODEL.insert({ nameQuestion, examID, answer, correct, userID });
        }

        return res.json(infoQuestion);

    } catch (error) {

        res.json(error.message);
    }
})

route.get('/list-question', ROLE_ADMIN, async (req, res) => {
    try {
        let listQuestion = await QUESTION_MODEL.getList();
        return res.json(listQuestion);
    } catch (error) {
        res.json(error.message);
    }
})

route.get('/info-question/:questionID', ROLE_ADMIN, async (req, res) => {
    try {
        let { questionID } = req.params;
    
        let infoQuestion = await QUESTION_MODEL.getInfo({ questionID });

        return res.json(infoQuestion);

    } catch (error) {
        res.json(error.message);
    }
})


route.post('/update-question/:questionID', ROLE_ADMIN, uploadMulter.single('image'), async (req, res) => {
    try {
        let { _id: userUpdate } = req.user;
        let { questionID } = req.params;
        let infoFile;

        if(req.file){
            infoFile  = req.file.originalname;

        }else{
            let infoQuestion = await QUESTION_MODEL.getInfo(questionID);
            
            infoFile = infoQuestion.data.image;
        }

        let { nameQuestion, examID, answer, correct } = req.body;

        let resultUpdate = await QUESTION_MODEL.update({ userUpdate, questionID, nameQuestion, examID, answer, correct, image: infoFile });

        res.json(resultUpdate)

    } catch (error) {
        res.json(error.message);
    }

})

route.get('/remove-question/:questionID', ROLE_ADMIN, async (req, res) => {

    try {
        let { questionID } = req.params;
        let { examID } = req.query;

        let resultRemove = await QUESTION_MODEL.remove({ questionID, examID });

        let pathOrigin = path.resolve(__dirname, `../../public/storage/images/${resultRemove.data.image}`);

        fs.unlink(pathOrigin, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });

        res.json(resultRemove);

    } catch (error) {
        res.json(error.message);
    }
    
})

module.exports = route;