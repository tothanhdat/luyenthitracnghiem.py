const route             = require('express').Router();
const QUESTION_MODEL    = require('../../models/question');
const EXAM_MODEL        = require('../../models/exam');
const ROLE_ADMIN        = require('../../utils/checkRole');
const { uploadMulter }  = require('../../utils/config_multer');
const fs                = require('fs');
const { renderToView }  = require('../../utils/childRouting');

route.post('/add-question', ROLE_ADMIN, uploadMulter.single('image'), async (req, res) => {
    try {
        let { nameQuestion, examID, answer, correct } = req.body;
        let infoFile = req.file;
        let listExam = await EXAM_MODEL.getList();

        let infoQuestion = await QUESTION_MODEL.insert({ nameQuestion, examID, answer, correct, image: infoFile.originalname });
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
        console.log({ infoQuestion });

        return res.json(infoQuestion);

    } catch (error) {
        res.json(error.message);
    }
})


route.post('/update-question/:questionID', ROLE_ADMIN, uploadMulter.single('image'), async (req, res) => {
    try {
        let { questionID } = req.params;
        let infoFile;

        if(req.file){
            infoFile  = req.file.originalname;

        }else{
            let infoQuestion = await QUESTION_MODEL.getInfo(questionID);
            
            infoFile = infoQuestion.data.image;
            console.log(infoFile);
        }

        let { nameQuestion, examID, answer, correct } = req.body;

        let resultUpdate = await QUESTION_MODEL.update({ questionID, nameQuestion, examID, answer, correct, image: infoFile });
        console.log({ resultUpdate })

        res.json(resultUpdate)

    } catch (error) {
        res.json(error.message);
    }

})

route.get('/remove-question/:questionID', ROLE_ADMIN, async (req, res) => {
    let { questionID } = req.params;

    let resultRemove = await QUESTION_MODEL.remove({ questionID });
    console.log({ resultRemove })

    res.json(resultRemove);
})

module.exports = route;