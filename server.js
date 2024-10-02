// Load Dependencies
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// Require and Initialize dotenv
require('dotenv').config();

// PORT Configuration
const PORT = process.env.PORT || 4004;

// Initialize Express
const app = express();

// Passport configuration
require('./config/passport');

app.use(express.static('public'));

// Database Configuration
require('./config/db');

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));

// Passport and session configurations
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Import Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const facilityRouter = require('./routes/facility');

// Mount Routes
app.use('/', indexRouter);
app.use('/auth', authRouter); 
app.use('/facility', facilityRouter);

// Start server on defined PORT
app.listen(PORT, () => {
  console.log(`ACTIVESPACES is running on PORT ${PORT}`);
});
