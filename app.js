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
  writeToMemory,
  setReadMemory,
  startChat,
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
let onlineIds = [];

wss.on('connection', function connection(ws, req) {
  const uuid = uuidv4();
  const { cookie } = req.headers;
  if (cookie) {
    const parsed = cookie.split('connect.sid=s%3A', 2)[1].split('.', 1)[0];

    (async function (cookie) {
      const id = await getUser(cookie);

      const isAlreadyHere = clients.filter((client) => +client.id === +id);

      if (isAlreadyHere.length) {
        clients.push({
          uuid,
          id,
          rooms: isAlreadyHere[0].rooms,
          messages: isAlreadyHere[0].messages,
          connection: ws,
        });
        onlineIds.push({ id, uuid });
        return {
          id: id,
          rooms: isAlreadyHere[0].rooms,
          messages: isAlreadyHere[0].rooms,
          isAlreadyHere: true,
        };
      }

      const rooms = await loadUserRooms(id);
      const messages = (await loadUserMessages(rooms)) || [];
      const finalRooms = getTheLatestMessages({ rooms, messages });
      return { id, rooms: finalRooms, messages, isAlreadyHere: false };
    })(parsed).then(({ id, rooms, messages, isAlreadyHere }) => {
      if (isAlreadyHere)
        return ws.send(JSON.stringify({ action: 'INFORMATION_IS_READY' }));

      clients.push({
        uuid,
        id: +id,
        rooms,
        messages,
        connection: ws,
      });
      onlineIds.push({ id, uuid });
      ws.send(JSON.stringify({ action: 'INFORMATION_IS_READY' }));
    });
  }

  ws.on('message', function incoming(data) {
    const { action, id } = JSON.parse(data);
    console.log({ action, onlineIds });

    switch (action) {
      case 'GET_CHATS':
        const { id } = JSON.parse(data);

        const isClient = clients.filter((client) => client.connection === ws);
        console.log({ isClient });
        if (isClient.length) {
          ws.send(
            JSON.stringify({
              action: 'GET_CHATS',
              payload: {
                ...isClient[isClient.length - 1],
                onlineIds,
                connection: true,
              },
            })
          );
        }
        break;

      case 'GET_ONLINE':
        const user_id = clients.filter((client) => client.connection === ws)[0]
          .id;

        ws.send(
          JSON.stringify({
            action: 'GET_ONLINE',
            payload: onlineIds.map((obj) => obj.id),
          })
        );

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
            const { message_id, send_at, is_read } = res.rows[0];
            const written = writeToMemory({
              message: {
                message_id,
                room_id: roomId,
                sender_id: senderId,
                context,
                send_at: send_at,
                is_read,
              },
              clients,
            });

            clients = written;

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
      // change in memory as well
      case 'SET_READ': {
        const { chatId, userId } = JSON.parse(data);
        (async () => {
          await setRead({ roomId: chatId, senderId: userId });
          clients = setReadMemory({
            room_id: chatId,
            sender_id: userId,
            clients,
          });
        })();
      }

      case 'START_CHAT': {
        const { me, other } = JSON.parse(data);
        console.log({ me, other });
        (async () => {
          const result = await startChat({ myId: me.id, otherId: other.id });
          console.log({ result });

          const chatForInitiator = {
            room_id: result.chatId,
            person_id: other.id,
            picture: other.picture,
            username: other.username,
            latestMessage: {},
            unread: 0,
          };

          const chatForAnother = {
            room_id: result.chatId,
            person_id: me.id,
            picture: me.picture,
            username: me.username,
            latestMessage: {},
            unread: 0,
          };

          const initiators = clients.filter((client) => +client.id === me.id);
          const sendTo = clients.filter((client) => +client.id === other.id);

          initiators.forEach((client) =>
            client.connection.send(
              JSON.stringify({ action: 'START_CHAT', chat: chatForInitiator })
            )
          );

          sendTo.forEach((client) =>
            client.connection.send(
              JSON.stringify({ action: 'START_CHAT', chat: chatForAnother })
            )
          );

        })();
      }

      default:
        break;
    }

    ws.on('close', (ws) => {
      clients = removeFromClients(uuid, clients);
      console.log({ onlineIds });
      onlineIds = onlineIds.filter((client) => client.uuid !== uuid);
      console.log({ onlineIds });
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
