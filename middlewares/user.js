const userModel = require('../models/user');
const md5 = require('md5');

exports.isUserRegistered = async (req, res, next) => {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({
    raw: true,
    where: { email, password: md5(password) },
  });

  if (!user) {
    req.user = false;
    req.data = { name: userName, email, password };
  } else {
    req.user = user;
  }

  next();
};
