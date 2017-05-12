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