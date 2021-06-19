const passport = require('passport');
const { google } = require('./google');
// const { local } = require('./local');
require('dotenv').config();

passport.use(google);
// passport.use(local);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

exports.success = (req, res) => res.redirect('/');
exports.fail = (req, res) => res.redirect('/authorization');
