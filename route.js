const express = require('express');
const router = express.Router();
const userController = require('./app/controller/user')

router.post('/user/create', (req, res) => new userController().create(req, res));
router.post('/user/login', (req, res) => new userController().login(req, res));

module.exports = router;