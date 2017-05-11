const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const Food = require('../models/food');
const should = chai.should()
const server = require('../app')

describe('Food CRUD testing', ()=>{
  var newFood_id = ''
  beforeEach((done)=>{
    var newFood = new Food({
      title: 'Makanan',
      describe: 'So Good',
      urlImg: 'gam.com/1.jpg',
      createdAt : new Date(),
      updatedAt : new Date()
    })

    newFood.save((err, Food)=>{
      // console.log(Food);
      newFood_id = Food._id
      done()
    })
  })

  afterEach((done)=>{
    Food.remove({},(err)=>{
      done()
    })
  })

  describe('Get - Food', ()=>{
    it('Should get Food', (done)=>{
      chai.request(server)
      .get('/foods')
      .end((err,result)=>{
        result.should.have.status(200)
        result.body.should.be.a('array')
        result.body[0].title.should.equal('Makanan')
        done()
      })
    })
  })

  //with method POST
  describe('Post - create Food', ()=>{
    it('should add a Food', (done)=>{
      chai.request(server)
      .post('/foods')
      .send({
        title: 'Makanan',
        describe: 'So Good',
        urlImg: 'gam.com/1.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      })
      .end((err, result)=>{
        console.log('post', result.body);
        // result.should.have.status(200)
        result.body.should.be.a('object')
        done()
      })
    })
  })

  //describe with method PUT
  describe('PUT - edit Food', () => {
    it('should update specific field in the Food', (done) => {
      chai.request(server)
      .patch('/foods/'+newFood_id)
      .send({
        title: "please not 500"      })
      .end( (err, result) => {
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.title.should.equal("please not 500")
        done()
      })

    });
  });

  //describe for delete
  describe('DELETE - delete Food', () => {
    it('should delete a Food', (done) => {
      chai.request(server)
      .delete('/foods/' + newFood_id)
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