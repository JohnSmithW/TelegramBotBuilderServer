const express = require('express');
const session = require('express-session');
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('./repositories/passport');

const server = require('http').Server(app);

!process.env.PORT && app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const showRoutes = require('./routes/index.js');

app.set('trust proxy', 1);
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', showRoutes(app));

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Ready on port ${PORT}`);
});
