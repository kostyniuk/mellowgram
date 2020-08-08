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

const {
  getUser,
  loadUserRooms,
  getTheLatestMessages,
  loadUserMessages,
  removeFromClients,
  sendMessageToDb,
  setRead,
} = require('./lib/wsUtils');

const { v4: uuidv4 } = require('uuid');

const app = express();

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

let clients = [];

wss.on('connection', function connection(ws, req) {
  const uuid = uuidv4();
  const { cookie } = req.headers;
  if (cookie) {
    const parsed = cookie.split('connect.sid=s%3A', 2)[1].split('.', 1)[0];

    (async function (cookie) {
      const id = await getUser(cookie);
      const rooms = await loadUserRooms(id);
      const messages = await loadUserMessages(rooms);
      const finalRooms = getTheLatestMessages({ rooms, messages });
      return { id, rooms: finalRooms, messages };
    })(parsed).then(({ id, rooms, messages }) => {
      clients.push({
        uuid,
        id: +id,
        rooms,
        messages,
        connection: ws,
      });
    });
  }

  // need to update in memomry clients messages on new message, so new connections can use the information instead of making requests

  ws.on('message', function incoming(data) {
    const { action, id } = JSON.parse(data);
    console.log({ action });

    switch (action) {
      case 'GET_CHATS':
        const { id } = JSON.parse(data);
        const isClient = clients.filter((client) => client.connection === ws);
        console.log({ isClient });
        if (isClient.length) {
          ws.send(
            JSON.stringify({
              action: 'GET_CHATS',
              payload: { ...isClient[0], connection: true },
            })
          );
        }
        console.log({ clients });
        break;
      case 'SEND_MESSAGE': {
        const { roomId, senderId, context, uuid } = JSON.parse(data);

        (async () => {
          const res = await sendMessageToDb({
            roomId,
            senderId,
            context,
          });
          if (res.success) {
            console.log({ res });
            console.log({ rows: res.rows });
            const { message_id, send_at } = res.rows[0];
            clients.forEach((client) => {
              if (
                client.rooms.map((room) => +room.room_id).includes(+roomId) &&
                client.connection.readyState === ws.OPEN &&
                ws !== client.connection
              ) {
                client.connection.send(
                  JSON.stringify({
                    action: 'SEND_MESSAGE',
                    messageInfo: {
                      messageId: message_id,
                      roomId,
                      senderId,
                      context,
                      date: send_at,
                    },
                  })
                );
              }
            });
          }
        })();
        break;
      }
      case 'SET_READ': {
        const { chatId, userId } = JSON.parse(data);
        (async () => {
          const res = await setRead({ roomId: chatId, senderId: userId });
          console.log({ res });
        })();
      }
      default:
        break;
    }

    ws.on('close', (ws) => {
      clients = removeFromClients(uuid, clients);
    });

    // wss.clients.forEach(function each(client) {
    //   // if (client !== ws && client.readyState === ws.OPEN) {
    //   client.send(data);
    //   console.log('send');
    //   // }
    // });
  });
});

server.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
