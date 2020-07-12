const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
const pg = require('pg');
const passport = require('passport');
const path = require('path');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser('12345-67890-09876-54321'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));

const pgPool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(
  session({
    // eslint-disable-next-line new-cap
    store: new pgSession({
      pool: pgPool, // Connection pool
      tableName: 'session',
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/public', express.static('public'));

app.use(require('./routes'));
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
