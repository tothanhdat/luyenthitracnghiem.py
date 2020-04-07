const route = require('express').Router();
const EXAM_MODEL = require('../../models/exam');
const { renderToView } = require('../../utils/childRouting');

route.post('/add-exam', async (req, res) => {
    let { name, description, level, subjectID } = req.body;

    // Kiểm tra quyền/check về logic (nếu có)

    // Thực hiện hành động sau khi đã check logic
    let resultInsert = await EXAM_MODEL.insert({ name, description, level, subjectID });
    return res.json(resultInsert);
})

route.get('/list-exam', async (req, res) => {
    let listExam = await EXAM_MODEL.getList();
    return res.json(listExam);
})

route.get('/info-exam/:examID', async (req, res) => {
    let { examID } = req.params;
    console.log(examID);
    
    // Kiểm tra quyền/check về logic (nếu có)
        
    let infoExam = await EXAM_MODEL.getInfo({ examID });
    return res.json(infoExam);
})

route.get('/update-exam/:examID', async (req, res) => {
    
})

route.post('/update-exam/:examID', async (req, res) => {
    let { examID } = req.params;
    let { name, description, level } = req.body;

    // Kiểm tra quyền/check về logic (nếu có)

    let resultUpdate = await EXAM_MODEL.update({ name, description, level, userUpdate, examID});
    return res.json(resultUpdate);
})

route.get('/remove-exam/:examID', async (req, res) => {
    let { examID } = req.params;
    let resultRemove = await EXAM_MODEL.remove({ examID });
    res.json(resultRemove);
})

module.exports = route;