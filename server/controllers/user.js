const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models/user');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

let controllers = {}

controllers.getAll = (req,res,next)=>{
  User.find({}, (err, users)=>{
    if(err) throw err
    res.send(users)
  })
}

controllers.createData = (req,res, next)=>{

  let newUser = User({
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    email: req.body.email,
    role: req.body.role
  })

  newUser.save((err, result)=>{
    console.log(err);
    // if(err) throw err;
    res.send(result)
  })
}

controllers.update = (req,res,next)=>{
  var newPassword = req.body.password ? passwordHash.generate(req.body.password) : null

  User.findById(req.params.id, (err, result)=>{

    result.username = req.body.username || result.username,
    result.password =  newPassword || result.password,
    result.email = req.body.email || result.email,
    result.role = req.body.role || result.role

    result.save((err, data)=>{
      if(err) throw err
      res.send(data)
    })
  })
}

controllers.delete = (req,res,next)=>{
  User.findByIdAndRemove(req.body.id, (err, data)=>{
    if(err) throw err
    res.send({message: 'has been delete'})
  })
}

module.exports = controllers;