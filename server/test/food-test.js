const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const Food = require('../models/food');
const should = chai.should()
const server = require('../app')

describe('testing CRUD for Food', ()=>{
  var newFood_id = ''

  //START DATA DUMMY
  beforeEach((done)=>{
    var newFood = new Food({
      menu: 'Food',
      name: 'Mozarella with Beef Bacon',
      description: 'Salah satu makanan favorite yang ada di eatlah dengan topping mozarella dan daging sapi yang di panggang',
      price: '200.000',
      vote_up: 0
    })

    newFood.save((err, food)=>{
      newFood_id = food._id
      done()
    })
  })

  afterEach((done)=>{
    Food.remove({},(err)=>{
      done()
    })
  })
  // END DATA DUMMY


  // START GET DATA ALL FOOD
  describe('Get - all Foods', ()=>{
    it('should get all food', (done)=>{
      chai.request(server)
      .get('/foods')
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('array')
        result.body.length.should.equal(1)
        result.body[0].menu.should.equal('Food')
        result.body[0].vote_up.should.be.a('number')
        done()
      })
    })
  })

  //END GET DATA ALL FOOD

  //START POST DATA FOODS
  describe('Post - create Food', ()=>{
    it('should add a food', (done)=>{
      chai.request(server)
      .post('/foods')
      .send({
        menu: 'Food',
        name: 'Mozarella with Beef Bacon',
        description: 'Salah satu makanan favorite yang ada di eatlah dengan topping mozarella dan daging sapi yang di panggang',
        price: '200.000',
        vote_up: 0
      })
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('object')
        result.body.menu.should.equal('Food')
        result.body.name.should.be.an('string')
        result.body.vote_up.should.be.an('number')
        done()
      })
    })
  })
  //END POST DATA FOODS

  //START UPDATE DATA FOODS
  describe('PUT - Update Food', ()=>{
    it('should update a food', (done)=>{
      chai.request(server)
      .put('/foods/'+newFood_id)
      .send({
        name: 'Keju berlapis Mozarella'
      })
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('object')
        result.body.message.should.equal('has been update')
        done()
      })
    })
  })
  //END UPDATE DATA FOODS

  //START DELETE DATA FOODS
  describe('delete - Food', ()=>{
    it('should remove a food', (done)=>{
      chai.request(server)
      .delete('/foods/'+newFood_id)
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.message.should.equal('has been delete')
        done()
      })
    })
  })
  //END DELETE DATA FOODS

})