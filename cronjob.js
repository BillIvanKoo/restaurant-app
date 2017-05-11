var CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer')

require('dotenv').config({path: '../.env'})

var kue = require('kue'),
    queue = kue.createQueue();

let helper = (params)=>{
  // console.log('helper',params.created_at);
  let create = params.created_at
  let date = create.getDate()
  let month = create.getMonth()
  let minute = create.getMinutes() + 1
  let hours = create.getHours()

  // second minute hourse date month week
  new CronJob(`00 ${minute} ${hours} ${date} ${month} *`,()=>{


  })

}


//QUEUE???

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


var mailOptions = {
  from: '"Dyan Kastutara" <dyankastutara19@gmail.com', // email server
  to : 'dyankastutara@gmail.com', // email tujuan // push array all member
  subject:'Nodemailer test',
  text: 'Hello World'
}

transporter.sendMail(mailOptions, (err, result)=>{  // send process
  if(err){
    console.log('error')
  }else{
    console.log("Email Sent")
  }
}) 



module.exports = helper;
