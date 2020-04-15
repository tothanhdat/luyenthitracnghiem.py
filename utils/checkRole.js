const { sign, verify } = require('../utils/jwt')
module.exports = async function (req, res, next) {
    // let token = req.cookies['token'];
    let { token } = req.session;
    //console.log({ token })
    if (!token)
        res.redirect('/');
    let checkRole = await verify(token);
    if (checkRole.data.role != 1)
        res.redirect('/home');
    next();
}