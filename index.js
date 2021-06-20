const express = require('express');
const PORT = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = express();
const path = require('path');
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

// app.use(express.static(path.join(__dirname, './public')));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', showRoutes(app));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/constructor', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/constructor.html'));
// });

// app.get('/authorization', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/authorization.html'));
// });

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Ready on port ${PORT}`);
});
