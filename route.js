const express = require('express');
const router = express.Router();
const userController = require('./app/controller/user');
const WalletController = require('./app/controller/wallet');
const Auth = require('./config/auth');

router.post('/user/create', (req, res) => new userController().create(req, res));
router.post('/user/login', (req, res) => new userController().login(req, res));
router.post('/beneficiary', new Auth().VerifyToken, (req, res) => new WalletController().create(req, res));
router.get('/beneficiary', (req, res) => new WalletController().get(req, res));

module.exports = router;