const ObjectId = require('mongoose').Types.ObjectId
const Food = require('../models/food');
const helper = require('../helper/cronjob');


let controllers = {}

controllers.getAll = (req,res,next)=>{
  Food.find({}, (err, foods)=>{
    if(err) res.send(err)
    res.send(foods)
  })
}

controllers.createData = (req,res, next)=>{
  var newFood = Food({
    img: req.body.img,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    created_at: new Date()
  })

  newFood.save((err, result)=>{
    if(err) res.send(err);

    Food.findOne({ name : req.body.name}, (err, data)=>{
      if(err) res.send(err)
      helper(data)
      res.send(data)
    })
  })
}

controllers.update = (req,res,next)=>{
  Food.findById(req.params.id, (err, result)=>{
    result.img =  req.body.img || result.img,
    result.name =  req.body.name || result.name,
    result.description = req.body.description || result.description,
    result.price = req.body.price || result.price
    result.category = req.body.category || result.category

    result.save((err, data)=>{
      if(err) res.send(err)
      res.send(data)
    })
  })
}

controllers.delete = (req,res,next)=>{
  Food.findByIdAndRemove(req.params.id, (err, data)=>{
    if(err) res.send(err)
    res.send(data)
  })
}

module.exports = controllers;