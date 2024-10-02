const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.get('/login', authCtrl.login_get);
router.post('/login', authCtrl.login_post);

router.get('/signup', authCtrl.signup_get);
router.post('/signup', authCtrl.signup_post);

router.get('/logout', authCtrl.logout);

module.exports = router;
