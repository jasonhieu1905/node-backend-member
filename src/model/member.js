const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = new mongoose.Schema({
    username: {
        type: 'String',
        required: true,
        minlength: 6,
        trim: true       
    },
    password: {
        type: 'String',
        required: true,
        minlength: 6,
        trim: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

schema.pre('save', function (next) {
    var member = this;
    Member.find({username : this.username},  (err, docs) => {
        if (!docs.length){
            // hash password before save database
            bcrypt.hash(member.password, 10, function (err, hash) {
                if (err) {
                    return next(err);
                }
                member.password = hash;
                next();
            })
        }else{                
            // username exists
            return next(new Error("Username exists!"));
        }
    });
}) ;

var Member = mongoose.model('Member', schema);
module.exports = Member;