const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../../models/user');

exports.google = new GoogleStrategy(
  {
    clientID: process.env['GOOGLE_KEY'],
    clientSecret: process.env['GOOGLE_SECRET_KEY'],
    callbackURL: 'http://127.0.0.1:8080/api/google/callback',
  },

  async (accessToken, refreshToken, userGoogle, done) => {
    const user = await userModel.findOne({
      raw: true,
      where: { name: userGoogle.name.givenName },
    });

    if (!user) {
      return userModel
        .create({
          name: userGoogle.name.givenName,
        })
        .then(res => done(null, res.dataValues));
    }
    return done(null, user);
  },
);
