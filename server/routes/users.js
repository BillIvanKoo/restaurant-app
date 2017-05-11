var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllers = require('../controllers/user');

/* GET users listing. */
router.get('/',controllers.getAll); // getAll

router.post('/signin', passport.authenticate('local', { session : false}), controllers.signIn)
router.post('/signup', controllers.signUp); // signUp


router.put('/:id', controllers.update); // update
router.delete('/:id', controllers.delete); // create

module.exports = router;
