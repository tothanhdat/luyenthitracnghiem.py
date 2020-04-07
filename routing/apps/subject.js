const route = require('express').Router();
const SUBJECT_MODEL = require('../../models/subjects');
const { renderToView } = require('../../utils/childRouting');

route.post('/add-subject', async (req, res) => {
    let { name, teacher } = req.body;

    // Kiểm tra quyền/check về logic (nếu có)

    // Thực hiện hành động sau khi đã check logic
    let resultInsert = await SUBJECT_MODEL.insert({ name, teacher });    
    return res.json(resultInsert);

})

route.get('/list-subject', async (req, res) => {
    let listSubject = await SUBJECT_MODEL.getList();
    return res.json(listSubject);
})

route.get('/info-subject/:subjectID', async (req, res) => {
    let { subjectID } = req.params;
    console.log(subjectID);
    
    // Kiểm tra quyền/check về logic (nếu có)
        
    let infoSubject = await SUBJECT_MODEL.getInfo({ subjectID });
    return res.json(infoSubject);
})

route.get('/remove-subject/:subjectID', async (req, res) => {
    let { subjectID } = req.params;
    let resultRemove = await SUBJECT_MODEL.remove({ subjectID });
    res.json(resultRemove);
})

module.exports = route;




