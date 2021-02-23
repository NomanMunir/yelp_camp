const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const CatchAsync = require('../utils/CatchAsync');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', CatchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next(err)
            req.flash('success', "Welcome to Yelp Camp!");
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    req.flash('success', 'Welcome Back!!');
    res.redirect(redirectUrl);
    delete req.session.returnTo;
})
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!!');
    res.redirect('/campgrounds');
});

module.exports = router;