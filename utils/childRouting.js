const jwt = require('./jwt.js');

let renderToView = async function(req, res, view, data) {
    let { token } = req.session;
    let user = await jwt.verify(token);
    data.infoUser = user.data
    res.render(view, data);
}
exports.renderToView = renderToView;