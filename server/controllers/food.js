const Food = require('../models/food');

let controllers = {}

controllers.getAll = (req,res,next)=>{
  Food.find({}, (err, Foods)=>{
    if(err) throw err
    res.send(Foods)
  })
}

controllers.createData = (req,res, next)=>{
  var newFood = Food({
    title: req.body.title,
    describe: req.body.describe,
    urlImg: req.body.urlImg
  })

  newFood.save((err, result)=>{
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
}

controllers.update = (req,res,next)=>{
  Food.findById(req.params.id, (err, result)=>{
    result.title = req.body.title || result.title,
    result.describe =  req.body.describe || result.describe,
    result.updatedAt = new Date()
    result.save((err, data)=>{
      if(err) throw err
      res.send(data)
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