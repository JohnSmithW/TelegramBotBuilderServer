const userModel = require('../models/user');

exports.isUserRegistered = async (req, res, next) => {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({
    raw: true,
    where: { email, password },
  });

  if (!user) {
    req.user = false;
    req.data = { name: userName, email, password };
  } else {
    req.user = user;
  }

  next();
};
