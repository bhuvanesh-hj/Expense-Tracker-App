const express = require('express');

const router = express.Router();

const sigupForm = require('../controller/user');

router.get('/user',sigupForm.usersForm);

router.post('/user/sigup',sigupForm.postSignUp);

module.exports = router;