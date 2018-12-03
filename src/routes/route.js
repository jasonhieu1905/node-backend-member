var path = require('path');
var memberController = require('./../controllers/member');

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.resolve('src/views/index.html'));
    });
    app.get("/member", function (req, res) {
        res.sendFile(path.resolve('src/views/member.html'));
    });

    app.route("/members").get(memberController.findAllMembers);
    app.route('/members').delete(memberController.deleteMember);
    app.route('/register').post(memberController.register);
    app.route('/login').post(memberController.login);  
}

