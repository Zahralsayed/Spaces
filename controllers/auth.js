const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.login_get = (req, res) => {
    res.render('auth/login');
};

exports.login_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
});

exports.signup_get = (req, res) => {
    res.render('auth/signup');
};

exports.signup_post = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.redirect('/auth/signup');
        }

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/signup');
    }
};

// logout
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/auth/login');
    });
  });
};

