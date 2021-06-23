const userModel = require('../models/user');
const md5 = require('md5');

exports.signUp = async (req, res) => {
  req.session.isAuthorized = true;

  if (!req.user) {
    const { name, email, password } = req.data;

    userModel.create({
      name: name,
      email,
      password: md5(password),
    });

    res.send({
      ok: true,
    });
  } else {
    res.send({
      ok: false,
      message: 'User with this email or password already exists',
    });
  }
};

exports.signIn = async (req, res) => {
  req.session.isAuth = true;

  console.log(req.session);
  if (req.user) {
    res.send({
      ok: true,
    });
  } else {
    res.send({
      ok: false,
      message: 'Email or password is incorrect',
    });
  }
};
