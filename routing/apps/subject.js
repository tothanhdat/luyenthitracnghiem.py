const route             = require('express').Router();
const SUBJECT_MODEL     = require('../../models/subjects');
const ROLE_ADMIN        = require('../../utils/checkRole');
const ROLE_SUPER_ADMIN  = require('../../utils/roleSuperAdmin');
const { renderToView }  = require('../../utils/childRouting');

route.post('/add-subject', ROLE_SUPER_ADMIN, async (req, res) => {
    let { name, teacher } = req.body;

    // Kiểm tra quyền/check về logic (nếu có)

    // Thực hiện hành động sau khi đã check logic
    let resultInsert = await SUBJECT_MODEL.insert({ name, teacher });  
    return res.json(resultInsert);

})

route.get('/list-subject', ROLE_ADMIN, async (req, res) => {
    let listSubject = await SUBJECT_MODEL.getList();
    return res.json(listSubject);
})

route.get('/info-subject/:subjectID', ROLE_ADMIN, async (req, res) => {
    let { subjectID } = req.params;
    
    // Kiểm tra quyền/check về logic (nếu có)
        
    let infoSubject = await SUBJECT_MODEL.getInfo({ subjectID });
    return res.json(infoSubject);
})

route.get('/remove-subject/:subjectID', ROLE_ADMIN, async (req, res) => {
    let { subjectID } = req.params;
    let resultRemove = await SUBJECT_MODEL.remove({ subjectID });
    res.json(resultRemove);
})

module.exports = route;




