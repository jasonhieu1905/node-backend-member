const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Member} = require('./../model/member');

const members = [
    {
        username: 'hieudoan1',
        password: 'password1'
    },
    {
        username: 'hieudoan2',
        password: 'password2'
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
            password: 'password3'
        }
        request(app)
            .post('/members')
            .send(member)
            .expect(200)
            .expect((res) => {
                expect(res.body.username).toBe(member.username);
                expect(res.body.password).toBe(member.password);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Member.find().then(members => {
                    expect(members.length).toBe(3);
                    expect(members[members.length-1].username).toBe(member.username);
                    expect(members[members.length-1].password).toBe(member.password);
                    done();
                }).catch((err) => {
                    done(err);
                })
            })
    })


    // it('should not create member with invalid body data', (done) => {
    //     request(app)
    //      .post('/members')
    //      .send({})
    //      .expect(400)
    //      .end((res, err) => {
    //          console.log('res', res.body);
    //          console.log('err', err);
    //          if(err) {
    //              return done(err);
    //          }
    //          Member.find().then(members => {
    //              expect(members.length).toBe(0);
    //              done();
    //          })
    //      })
    // })
})

describe('POST - members', () => {
    it('should get all members', (done) => {
        request(app)
            .get('/members')
            .expect(200)
            .expect(res => {
                expect(res.body.members.length).toBe(2)
            })
            .end(done);
    })
})