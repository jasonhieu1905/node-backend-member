var Member = require('./../model/member');
var bcrypt = require('bcrypt');
exports.register = function (req, res) {
    
    Member.create(req.body, (err, members) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(members).end();
        }
    }) 
}

exports.login = function (req, res) {
    Member.findOne({username: req.body.username}, (err, member) => {
        if(member) {
            bcrypt.compare(req.body.password, member.password,  (err, result) => {
                if (result === true) {
                    return res.send(member).end();
                } else {
                    return res.status(404).end('Password is not correct');
                }
            })
        } else {
            res.status(404).end('Username is not correct');
        }
    })
}

exports.findAllMembers = function (req, res) {
    Member.find({admin: false}, (err, members) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(members).end();
        }
    }) 
}

exports.deleteMember = function(req, res) {
    Member.deleteOne({username: req.body.username}, (err, member) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(member).end();
        }
    })
}



