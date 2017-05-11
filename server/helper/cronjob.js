var CronJob = require('cron').CronJob;
require('dotenv').config({path: '../.env'})
const User = require('../models/user');


var kue = require('kue'),
    queue = kue.createQueue();

let helper = (params)=>{
  console.log(params);
  let create = params.created_at
  let date = create.getDate()
  let month = create.getMonth()
  let minute = create.getMinutes() + 1
  let hours = create.getHours()
  console.log('minute -- ',minute);
  console.log('hour -- ', hours);
  console.log('date -- ', date);
  console.log('month -- ', month);

  User.find({role : 'member'},(err, users)=>{
    users.map((user)=>{
      console.log('data -- ',user)
      queue.create('email', {
        subject : `New Promo @EATLAH`,
        message : `Dapatkan potong 50% untuk menu baru kita : ${params.name} hanya di EATLAH, tunjukan email ini di kasir kami.  #selama masa promo`,
        to: user.email
      }).save((err)=>{
        if(err) throw err
      })

      // second minute hourse date month week
      new CronJob(`00 ${minute} ${hours} ${date} ${month} *`, function () {
        queue.process('email', function (job, done) {
          email(job.data, done)
          done()
        })
      }, null, true, 'Asia/Jakarta')

    })
  })

}

function email(paramsJob, done) {
  console.log('di email -- ',paramsJob);
  var send = require('gmail-send')({
    user : 'durotar.resis2@gmail.com',
    pass : 'lbnnwbaxdraeeyiv',
    to : paramsJob.to,

    subject : paramsJob.subject,
    text : paramsJob.message,
  })();

  // done()
}

module.exports = helper;