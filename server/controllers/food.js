const ObjectId = require('mongoose').Types.ObjectId
const Food = require('../models/food');

let controllers = {}

controllers.getAll = (req,res,next)=>{
  Food.find({}, (err, users)=>{
    if(err) throw err
    res.send(users)
  })
}

controllers.createData = (req,res, next)=>{
  var newFood = Food({
    menu: req.body.menu,
    name: req.body.name,
    description: req.body.desc,
    price: req.body.price,
    vote_up: req.body.vote_up
  })

  newFood.save((err, result)=>{
    if(err) throw err;
    res.send(result)
  })
}

controllers.update = (req,res,next)=>{
  Food.findById(req.params.id, (err, result)=>{

    result.menu = req.body.menu || result.menu,
    result.name =  req.body.name || result.name,
    result.description = req.body.desc || result.description,
    result.price = req.body.price || result.price
    result.vote_up = req.body.vote_up || result.vote_up

    result.save((err, data)=>{
      if(err) throw err
      res.send({message: 'has been update'})
    })
  })
}

controllers.delete = (req,res,next)=>{
  Food.findByIdAndRemove(req.params.id, (err, data)=>{
    if(err) throw err
    res.send({message: 'has been delete'})
  })
}

module.exports = controllers;