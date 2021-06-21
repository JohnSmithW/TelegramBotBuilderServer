const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./repositories/passport');

const server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const showRoutes = require('./routes/index.js');

app.use(
  cookieSession({
    name: 'session',
    keys: ['secret'],
    maxAge: 24 * 60 * 60 * 1000,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', showRoutes(app));

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Ready on port ${PORT}`);
});
