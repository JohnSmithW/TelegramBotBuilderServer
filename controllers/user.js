const userModel = require('../models/user');
const md5 = require('md5');

exports.signUp = async (req, res) => {
  if (!req.user) {
    const { name, email, password } = req.data;

    userModel.create({
      name: name,
      email,
      password: md5(password),
    });

    req.session.isAuthorized = true;

    res.redirect('/');
  } else {
    res.send({
      ok: true,
      message: 'User with this email or password already exists',
    });
  }
};

exports.signIn = (req, res) => {
  if (req.user) {
    req.session.isAuthorized = true;

    res.redirect('/');
  } else {
    res.send({
      ok: true,
      message: 'Email or password is incorrect',
    });
  }
};
