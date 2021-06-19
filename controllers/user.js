const userModel = require('../models/user');
const md5 = require('md5');

exports.signUp = async (req, res, done) => {
  if (!req.user) {
    const { name, email, password } = req.data;
    let ok = false;

    userModel.create({
      name: name,
      email,
      password: md5(password),
    });

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
    res.redirect('/');
  } else {
    res.send({
      ok: true,
      message: 'Email or password is incorrect',
    });
  }
};
