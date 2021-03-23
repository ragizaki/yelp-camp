const User = require('../models/user');

const renderRegisterForm = (req, res) => {
    res.render('users/register');
};

const registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
};

const renderLoginForm = (req, res) => {
    res.render('users/login');
};

const loginUser = async (req, res) => {
    req.flash('success', 'Welcome!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

const renderLogoutForm = (req, res) => {
    req.logout();
    req.flash('success', 'You have been logged out!');
    res.redirect('/campgrounds');
};

module.exports = {
    renderRegisterForm,
    registerUser,
    renderLoginForm,
    loginUser,
    renderLogoutForm,
};
