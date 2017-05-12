const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models/user');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: '../.env'})

let controllers = {}

controllers.getAll = (req,res,next)=>{
  User.find({}, (err, users)=>{
    if(err) res.send(err)
    res.send(users)
  })
}

controllers.signIn = (req,res,next)=>{
  let obj = req.user
  if(obj.hasOwnProperty("message")){
    res.send(obj.message)
  } else {
    let token = jwt.sign({
      username : obj.username,
      email: obj.email,
      role : obj.role
    },process.env.SECRET,{
      expiresIn : '1h'
    })
    res.send({token: token})
  }
}

controllers.signUp = (req,res, next)=>{
  var newUser = User({
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    email: req.body.email,
    role: req.body.role
  })

  newUser.save((err, result)=>{
    if(err) res.send(err);
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
      if(err) res.send(err)
      res.send(data)
    })
  })
}

controllers.delete = (req,res,next)=>{
  User.findByIdAndRemove(req.params.id, (err, data)=>{
    if(err) res.send(err)
    res.send(data)
  })
}

controllers.verifyToken = (req,res) =>{
  jwt.verify(req.params.token, process.env.SECRET, function (err,decoded){
    res.send(decoded)
  })
}
module.exports = controllers;