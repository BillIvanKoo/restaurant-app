const chai = require('chai');
const chaiHttp = require('chai-http');
const passwordHash = require('password-hash');
chai.use(chaiHttp)

const User = require('../models/user');
const Food = require('../models/food');
const should = chai.should()
const server = require('../app')


describe('User CRUD testing', ()=>{
  var newUser_id = ''
  beforeEach((done)=>{
    var newUser = new User({
      username: 'gamgam',
      password: passwordHash.generate('gamgam'),
      email: 'gam@gmail.com',
      role: 'admin'
    })
    newUser.save((err, user)=>{
      newUser_id = user._id
      done()
    })
  })

  afterEach((done)=>{
    User.remove({},(err)=>{
      done()
    })
  })

  //START GET DATA USERS
  describe('Get All Data- User', ()=>{
    it('Should get User', (done)=>{
      chai.request(server)
      .get('/users')
      .end((err,result)=>{
        result.should.have.status(200)
        result.body.should.be.a('array')
        result.body[0].password.should.not.equal('gamgam')
        done()
      })
    })
  })
  //END GET DATA USERS

  //START POST USERS SIGNUP
  describe('Post - create User', ()=>{
    it('should add a user with all data true', (done)=>{
      chai.request(server)
      .post('/users/signup')
      .send({
        username: 'bambang',
        password: 'bambang',
        email: 'bambang@gmail.com',
        role: 'member'
      })
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('object')
        result.body.role.should.equal('member')
        result.body.password.should.not.equal('bambang')
        done()
      })
    })
  })

  describe('Post - create User with email error', ()=>{
    it('should add a user with email validation false', (done)=>{
      chai.request(server)
      .post('/users/signup')
      .send({
        username: 'bambang',
        password: 'bambang',
        email: 'bambang@gmail',
        role: 'member'
      })
      .end(function(err, result){
        result.should.have.status(200)
        result.body.message.should.equal('User validation failed');
        done();
      })
    })
  })
  //END POST USERS SIGNUP

  //START PUT  USERS
  describe('PUT - edit User', () => {
    it('should update specific field in the user', (done) => {
      chai.request(server)
      .put('/users/'+newUser_id)
      .send({
        username: "admin",
        password: "admin",
        email: "admin@gmail.com"
      })
      .end( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.username.should.equal("admin")
        done()
      })

    });
  });

  describe('PUT - edit User', () => {
    it('should update specific field in the user with email validation error', (done) => {
      chai.request(server)
      .put('/users/'+newUser_id)
      .send({
        username: "admin",
        password: "admin",
        email: "admin.com"
      })
      .end( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.message.should.equal('User validation failed')
        done()
      })

    });
  });
  //END PUT USERS

  //START DELETE USERS
  describe('DELETE - delete user', () => {
    it('should delete a user', (done) => {
      chai.request(server)
      .delete('/users/' + newUser_id)
      .end( (err, result) => {
        console.log(result.body)
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.message.should.equal("has been delete")
        done()
      })
    });
  });

  //START SIGNIN USERS
  describe('SIGNIN USER', () => {
    it('should signin a user', (done) => {
      chai.request(server)
      .post('/users/signin')
      .send({
        username : 'gamgam',
        password : 'gamgam'
      })
      .end( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.token.should.be.an('string')
        done()
      })
    });
  })
  //END SIGNIN USERS
})

