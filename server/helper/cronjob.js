// var CronJob = require('cron').CronJob,
//     kue = require('kue'),
//     queue = kue.createQueue();
// const nodemailer = require('nodemailer');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/eatlah',(err, res)=>{
//   console.log(`Connected to Database Development`);
// });

// const User = require('../models/user');
// require('dotenv').config({path: '../.env'})


// let helper = (params)=>{
//   console.log('helper',params.created_at);
//   let create = params.created_at
//   let date = create.getDate()
//   let month = create.getMonth()
//   let minute = create.getMinutes() + 1
//   let hours = create.getHours()
//   console.log(minute)
//   console.log(hours)

//   // second minute hourse date month week
//   new CronJob(`00 ${minute} ${hours} ${date} ${month} *`,function(){

//   User.find({role : "member"},(err, users)=>{
//     console.log(users)
//     var arr=[]
//     users.map((user)=>{
//       arr.push(user.email)
//     })
//     console.log(arr)
  

//   var dataMessage = {
//     from: '"Dyan Kastutara" <dyankastutara19@gmail.com', // email server
//     to : arr, // email tujuan // push array all member
//     subject:'Nodemailer test',
//     text: 'Hello World'
//   }

//     var job = queue.create('email', dataMessage)
//     .save(function(err) {
//         if (!err) console.log(job.id);
//         console.log('You will see this message if CronJob Active');
//     });

//     queue.process('email', function(job, done) {
//       var transporter = nodemailer.createTransport({
//         service : 'gmail',
//         host: 'smtp.gmail.com',
//           port: 587,
//           secure: false, // upgrade later with STARTTLS
//           auth: {
//               user: 'dyankastutara19@gmail.com', //Akun Email
//               pass: '.19071994.' // password Email
//           }
//       })

//       transporter.verify(function(error, success) { // test Verifikasi
//          if (error) {
//               console.log(error);
//          } else {
//               console.log('Server is ready to take our messages');
//          }
//       });

//       transporter.sendMail(dataMessage, (err, result)=>{  // send process
//         if(err){
//           console.log('error')
//         }else{
//           console.log("Email Sent")
//       }

//         done()
//       })
//     })
//     })
//   }, null, true, 'Asia/Jakarta')

// }


// module.exports = helper;
// =======
var CronJob = require('cron').CronJob;
require('dotenv').config({path:'../.env'})

const User = require('../models/user');

const nodemailer = require('nodemailer');

var kue = require('kue'),
    queue = kue.createQueue();

let helper = (params)=>{
  console.log(params);
  var create = params.created_at
  var date = create.getDate()
  var month = create.getMonth()
  var minute = create.getMinutes() + 1
  var hours = create.getHours()
  console.log('minute -- ',minute);
  console.log('hour -- ', hours);
  // console.log('date -- ', date);
  // console.log('month -- ', month);

    // second minute hourse date month week
    new CronJob(`00 ${minute} ${hours} ${date} ${month} *`, function () {
      User.find({role : 'member'},(err, users)=>{
        var emails = []
        users.map((user)=>{
          emails.push(user.email)
        })

        var conversion = emails.toString()

        queue.create('email', {
          subject : `New Promo @EATLAH`,
          message : `Dapatkan potong 50% untuk menu baru kita : ${params.name} hanya di EATLAH, tunjukan email ini di kasir kami.  #selama masa promo`,
          to: conversion
        }).save((err)=>{
          if(err) throw err
        })
      })

      queue.process('email', function (job, done) {
          email(job.data, done)
        })
      }, null, true, 'Asia/Jakarta')

  function email(paramsJob, done) {
    console.log('di email -- ',paramsJob);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    transporter.verify(function(error, success) { // test Verifikasi
       if (error) {
            console.log(error);
       } else {
            console.log('Server is ready to take our messages');
       }
    });
    // console.log(paramsJob.to);
    // console.log(typeof paramsJob.to);
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"zanEat" <durotar.resis2@gmail.com>', // sender address
        to: paramsJob.to, // list of receivers
        subject: paramsJob.subject, // Subject line
        text: paramsJob.message, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return done()
    });
  }
}

module.exports = helper;
