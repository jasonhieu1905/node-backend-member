var path = require('path');
var memberController = require('./../controllers/member');

module.exports = function (app) {
    app.get('*', function (req, res) {
        res.sendFile(path.resolve('src/views/index.html'));
    });
    app.route('/register').post(memberController.register);
    app.route('/login').post(memberController.login);
    // app.route('/login').post(userList.login);
    // app.route('/users').all(userList.isTokenValid)
    // .post( userList.findUser);
}

