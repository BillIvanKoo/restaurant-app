var CronJob = require('cron').CronJob;
require('dotenv').config({path: '../.env'})

var kue = require('kue'),
    queue = kue.createQueue();

let helper = (params)=>{
  // console.log('helper',params.created_at);
  let create = params.created_at
  let date = create.getDate()
  // console.log('date', date);
  let month = create.getMonth()
  // console.log('month', month);
  let minute = create.getMinutes() + 1
  // console.log('minute', minute);
  let hours = create.getHours()
  // console.log('hours', hours);

  // second minute hourse date month week
  new CronJob(`00 ${minute} ${hours} ${date} ${month} *`)
}


module.exports = helper;