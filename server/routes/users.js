var express = require('express');
var router = express.Router();

const controllers = require('../controllers/user');

/* GET users listing. */
router.get('/', controllers.getAll); // getAll
router.post('/', controllers.createData); // create
router.patch('/:id', controllers.update); // update
router.delete('/:id', controllers.delete); // create

module.exports = router;
