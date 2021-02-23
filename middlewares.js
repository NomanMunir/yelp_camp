module.exports.isLogedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must sign in!');
        return res.redirect('/login');
    }
    next();
}