const userModel = require('../models/user');

exports.signUp = async (req, res, done) => {
  if (!req.user) {
    const { name, email, password } = req.data;
    let ok = false;

    userModel.create({
      name: name,
      email,
      password,
    });

    res.redirect('/');
  } else {
    res.send({
      ok: true,
      message: 'User with this email or password already exists',
    });
  }
};

exports.signIn = (req, res) => {};
