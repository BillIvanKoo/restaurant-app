var express = require('express');
var router = express.Router();

const controllers = require('../controllers/user');

/* GET users listing. */
router.get('/', controllers.getAll); // getAll
// router.get('/:id', controllers.getAll); // get one User

router.post('/', controllers.createData); // create
router.put('/:id', controllers.update); // update
router.delete('/:id', controllers.delete); // create

module.exports = router;
