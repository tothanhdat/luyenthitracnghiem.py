module.exports = async function (req, res, next) {
    let { token } = req.session;
    if (!token)
        res.redirect('/');
    next();
}
