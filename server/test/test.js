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

  //masukin data dummy
  beforeEach((done)=>{
    var newUser = new User({
      username: 'gamgam',
      password: passwordHash.generate('gamgam'),
      email: 'gam@gmail.com',
      role: 'admin'
    })

    newUser.save((err, user)=>{
      // console.log(user);
      newUser_id = user._id
      done()
    })
  })

  afterEach((done)=>{
    User.remove({},(err)=>{
      done()
    })
  })

  //get data all User
  describe('Get - User', ()=>{
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

  //with method POST
  describe('Post - create User', ()=>{
    it('should add a user', (done)=>{
      chai.request(server)
      .post('/users')
      .send({
        username: 'bambang',
        password: 'bam',
        email: 'bam@gmail.com',
        role: 'admin'
      })
      .end((err, result)=>{
        // console.log('post', result.body);
        result.should.have.status(200)
        result.body.should.be.a('object')
        done()
      })
    })
  })

  //describe with method PUT
  describe('PUT - edit User', () => {
    it('should update specific field in the user', (done) => {
      chai.request(server)
      .put('/users/'+newUser_id)
      .send({
        username: "please not 500"
      })
      .end( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.username.should.equal("please not 500")

        done()
      })

    });
  });

  //describe for delete
  describe('DELETE - delete user', () => {
    it('should delete a user', (done) => {
      chai.request(server)
      .delete('/users/' + newUser_id)
      .end( (err, result) => {
        // console.log('delete***', result);
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.message.should.equal("has been delete")
        done()
      })
    });
  });

})

describe('testing CRUD for Food', ()=>{
  var newFood_id = ''

  //masukin data dummy
  beforeEach((done)=>{
    var newFood = new Food({
      menu: 'Eat',
      name: 'Mozarella with Beef Bacon',
      description: 'Salah satu makanan favorite yang ada di eatlah dengan topping mozarella dan daging sapi yang di panggang',
      price: '200.000',
      vote_up: 0
    })

    newFood.save((err, food)=>{
      // console.log(food);
      newFood_id = food._id
      done()
    })
  })

  afterEach((done)=>{
    Food.remove({},(err)=>{
      done()
    })
  })

  //get data all Food
  describe('Get - all Foods', ()=>{
    it('should get all food', (done)=>{
      chai.request(server)
      .get('/foods')
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('array')
        result.body.length.should.equal(1)

        done()
      })
    })
  })

  //create data with POST
  describe('Post - create Food', ()=>{
    it('should add a food', (done)=>{
      chai.request(server)
      .post('/foods')
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('object')

        done()
      })
    })
  })

  //Update data Food
  describe('PUT - create Food', ()=>{
    it('should update a food', (done)=>{
      chai.request(server)
      .put('/foods/'+newFood_id)
      .send({
        name: 'Keju berlapis Mozarella'
      })
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('object')
        result.body.message.should.not.equal('not been update')

        done()
      })
    })
  })

  //delete data Food
  describe('delete - Food', ()=>{
    it('should remove a food', (done)=>{
      chai.request(server)
      .delete('/foods/'+newFood_id)
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('object')
        result.body.message.should.equal('has been delete')

        done()
      })
    })
  })
})