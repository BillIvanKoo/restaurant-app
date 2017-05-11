var ezemail = require('easygmail');

var SCOPES = ['https://www.googleapis.com/auth/gmail.compose'],
    TOKEN_DIR = '/Users/zani/.credentials/',
    TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json',
    client_secret_dir = '/Users/zani/Desktop/Course/phase2/week3/group_project/restaurant-app/server/gmail/client_secret.json'

var youremail = {
  from: 'durotar.resis2@gmail.com',
  to: 'durotar.resis1@gmail.com',
  title: 'wassup dude',
  content: 'wassaaaah dude'
}

ezemail.sendMail(TOKEN_DIR , TOKEN_PATH, SCOPES, client_secret_dir, youremail);