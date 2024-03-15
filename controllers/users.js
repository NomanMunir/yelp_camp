const User = require('../models/user');
const CatchAsync = require('../utils/CatchAsync');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.registerUsers = CatchAsync(async (req, res, next) => {
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
})

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}
module.exports.loginUsers = (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    req.flash('success', 'Welcome Back!!');
    res.redirect(redirectUrl);
    delete req.session.returnTo;
}

module.exports.logoutUsers = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    });
}