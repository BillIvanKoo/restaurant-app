var CronJob = require('cron').CronJob,
    kue = require('kue'),
    queue = kue.createQueue();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/eatlah',(err, res)=>{
  console.log(`Connected to Database Development`);
});

const User = require('../models/user');
require('dotenv').config({path: '../.env'})


let helper = (params)=>{
  console.log('helper',params.created_at);
  let create = params.created_at
  let date = create.getDate()
  let month = create.getMonth()
  let minute = create.getMinutes() + 1
  let hours = create.getHours()
  console.log(minute)
  console.log(hours)

  // second minute hourse date month week
  new CronJob(`00 ${minute} ${hours} ${date} ${month} *`,function(){

  User.find({role : "member"},(err, users)=>{
    console.log(users)
    var arr=[]
    users.map((user)=>{
      arr.push(user.email)
    })
    console.log(arr)
  

  var dataMessage = {
    from: '"Dyan Kastutara" <dyankastutara19@gmail.com', // email server
    to : arr, // email tujuan // push array all member
    subject:'Nodemailer test',
    text: 'Hello World'
  }

    var job = queue.create('email', dataMessage)
    .save(function(err) {
        if (!err) console.log(job.id);
        console.log('You will see this message if CronJob Active');
    });

    queue.process('email', function(job, done) {
      var transporter = nodemailer.createTransport({
        service : 'gmail',
        host: 'smtp.gmail.com',
          port: 587,
          secure: false, // upgrade later with STARTTLS
          auth: {
              user: 'dyankastutara19@gmail.com', //Akun Email
              pass: '.19071994.' // password Email
          }
      })

      transporter.verify(function(error, success) { // test Verifikasi
         if (error) {
              console.log(error);
         } else {
              console.log('Server is ready to take our messages');
         }
      });

      transporter.sendMail(dataMessage, (err, result)=>{  // send process
        if(err){
          console.log('error')
        }else{
          console.log("Email Sent")
      }

        done()
      })
    })
    })
  }, null, true, 'Asia/Jakarta')

}


module.exports = helper;
