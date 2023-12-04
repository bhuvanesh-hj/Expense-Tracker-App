const express = require('express');

const router = express.Router();

const userActions = require('../controller/user');

router.get('/',userActions.usersLoginForm);

router.post('/signup',userActions.postSignUp);

router.post('/login',userActions.postLogIn);

module.exports = router;