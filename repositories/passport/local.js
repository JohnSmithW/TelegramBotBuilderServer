// const LocalStrategy = require('passport-local').Strategy;
// const userModel = require('../../models/user');

// exports.local = new LocalStrategy(
//   {
//     usernameField: 'email',
//   },
//   function (email, password, done) {
//     userModel.findOne(
//       { email: email, password: password },
//       function (err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return userModel
//             .create({
//               name: ,
//             })
//             .then(res => done(null, res.dataValues));
//         }
//         return done(null, user);
//       },
//     );
//   },
// );
