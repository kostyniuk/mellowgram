const express = require('express');
const ws = require('ws');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pg = require('pg');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');
const app = express();

const { formParams } = require('./lib/sqlUtils');

const PORT = process.env.PORT || 5000;

app.use(cookieParser('12345-67890-09876-54321'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan('tiny'));

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(
  session({
    store: new pgSession({
      pool: pgPool,
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

const server = http.createServer(app);

const wss = new ws.Server({ server });

const getUser = async (cookie) => {
  try {
    const querySession = `SELECT sess from Session WHERE sid = $1;`;
    const paramsSession = [cookie];
    const { rows } = await db.query(querySession, paramsSession);
    if (rows.length) {
      return rows[0].sess.passport.user;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

const loadUserRooms = async (id) => {
  try {
    console.log({ id });
    const querySession = `SELECT * from Room WHERE (user1_id = $1) OR (user2_id = $1);`;
    const paramsSession = [id];
    const { rows } = await db.query(querySession, paramsSession);
    if (rows.length) {
      return rows;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};
/*
let addParameters = formParams(userIds.length);
  const query2 = `SELECT p.person_id, p.picture, u.username
        FROM person p INNER JOIN user_info u on (p.person_id = u.user_id)
        WHERE p.person_id in (${addParameters})`;

  const params2 = userIds;
*/
const loadUserMessages = async (rooms) => {
  try {
    const ids = rooms.map((room) => room.room_id);
    const addParameters = formParams(ids.length);
    const querySession = `SELECT * from Messages WHERE room_id in (${addParameters})`;
    const paramsSession = ids;
    const { rows } = await db.query(querySession, paramsSession);
    if (rows.length) {
      return rows;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

// user: {
//   id: id!,
//   rooms: [roomId]
//   messages: [
//    {room_id: roomId, messages: [{messageId, sender_id, context, sendAt}]},
//    {room_id: roomId, messages: [{messageId, sender_id, context, sendAt}]},
//  ],
//  connection: ws
// }

const clients = [];

wss.on('connection', function connection(ws, req) {
  const { cookie } = req.headers;
  if (cookie) {
    console.log({ cookie });
    const parsed = cookie.split('connect.sid=s%3A', 2)[1].split('.', 1)[0];

    console.log({ parsed });

    (async function (cookie) {
      const id = await getUser(cookie);
      const rooms = await loadUserRooms(id);
      const messages = await loadUserMessages(rooms);
      return { id, rooms, messages };
    })(parsed).then(({ id, rooms, messages }) => {
      clients.push({
        id,
        rooms: rooms.map((room) => room.room_id),
        messages,
        connection: ws,
      });
      console.log({ clients });
    });
  }

  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data);
        console.log('send');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
