const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const  Member = require('./../model/member');
var bcrypt = require('bcrypt');

// init data for testing
const members = [
    {
        username: 'hieudoan1',
        password: '123123'
    },
    {
        username: 'hieudoan2',
        password: '123123'
    }
]

beforeEach((done) => {
    Member.deleteMany({}).then(() => {
        return Member.insertMany(members)
    }).then(() => done());
})

describe('POST - members', () => {
    it('should create a new member role user', (done) => {
        var member = {
            username: 'hieudoan3',
            password: '123123'
        }
        request(app)
            .post('/register')
            .send(member)
            .expect(200)
            .expect((res) => {
                expect(res.body.username).toBe(member.username);
                bcrypt.compare(member.password, res.body.password,  (err, result) => {
                    expect(result).toBe(true);
                })
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Member.find().then(members => {
                    expect(members.length).toBe(3);
                    expect(members[members.length - 1].username).toBe(member.username);
                    bcrypt.compare(member.password, res.body.password,  (err, result) => {
                        expect(result).toBe(true);
                    })
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })


    it('should not create member with username already exist', (done) => {
        const member = {username: 'hieudoan1', password: '123123'}
        request(app)
         .post('/register')
         .send(member)
         .expect(400)
         .end((res, err) => {
             expect(err.text).toBe("Username exists!")
             Member.find().then(members => {
                 expect(members.length).toBe(2);
                 done();
             })
         })
    })
})

describe('GET - members', () => {
    it('should get all members', (done) => {
        request(app)
            .get('/members')
            .expect(200)
            .expect(res => {
                expect(res.body.length).toBe(2)
            })
            .end(done);
    })
})

describe('DELETE - members', () => {
    it('should delete member', (done) => {
        const member = { username: 'hieudoan1' }
        request(app)
            .delete('/members')
            .send(member)
            .expect(200)
            .expect(res => {
                expect(res.body.ok).toBe(1);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Member.find({}).then(members => {
                    expect(members.length).toBe(1);
                    done();
                }).catch((err) => {
                    done(err);
                })
            });
    })
})