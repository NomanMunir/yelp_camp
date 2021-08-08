const express = require('express');
const router = express.Router();
const passport = require('passport')
const {renderRegister, registerUsers, renderLogin, loginUsers, logoutUsers} = require('../controllers/users');

router.route('/register')
    .get(renderRegister)
    .post(registerUsers);

router.route('/login')
    .get(renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginUsers)

router.get('/logout', logoutUsers);

module.exports = router;