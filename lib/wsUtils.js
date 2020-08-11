const db = require('../config/db');
const { formParams } = require('./sqlUtils');

module.exports = {
  getUser: async (cookie) => {
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
  },
  loadUserRooms: async (id) => {
    try {
      const querySession = `SELECT * from Room WHERE (user1_id = $1) OR (user2_id = $1);`;
      const paramsSession = [id];
      const { rows } = await db.query(querySession, paramsSession);
      if (rows.length) {
        const roomsIds = rows.map((room) => room.room_id);
        const userIds = rows.map((room) => {
          return +room.user1_id === +id ? room.user2_id : room.user1_id;
        });
        const addParameters = formParams(userIds.length);
        const queryUsersInfo = `SELECT person.person_id, person.picture, user_info.username FROM Person JOIN user_info on user_info.user_id = person.person_id WHERE user_info.user_id in (${addParameters});
      `;
        const paramsUsersInfo = userIds;

        const usersInfo = await db.query(queryUsersInfo, paramsUsersInfo);

        var sortingArr = userIds;
        const sortFunc = (a, b) => {
          return (
            sortingArr.indexOf(a.person_id) - sortingArr.indexOf(b.person_id)
          );
        };

        const result = usersInfo.rows.sort(sortFunc);

        let rooms = rows.map((_, i) => ({
          room_id: roomsIds[i],
          ...result[i],
        }));

        return rooms;
      }

      return [];
    } catch (e) {
      console.log(e);
    }
  },
  getTheLatestMessages: ({ rooms, messages }) => {
    if (!rooms) return [];

    const latestMessages = rooms.map((room) => {
      const filtered = messages.filter((message) => {
        return +message.room_id === +room.room_id;
      });

      const patched = { ...room, latestMessage: filtered.pop() };
      return patched;
    });

    return latestMessages;
  },
  loadUserMessages: async (rooms) => {
    try {
      if (!rooms) return [];

      const ids = rooms.map((room) => room.room_id);
      const addParameters = formParams(ids.length);
      const querySession = `SELECT * from Messages WHERE room_id in (${addParameters}) ORDER BY send_at ASC`;
      const paramsSession = ids;
      const { rows } = await db.query(querySession, paramsSession);
      if (rows.length) {
        return rows;
      }
      return [];
    } catch (e) {
      console.log(e);
    }
  },
  removeFromClients: (uuid, clients) =>
    clients.filter((client) => client.uuid !== uuid),
  sendMessageToDb: async ({ roomId, senderId, context }) => {
    try {
      const query = `INSERT INTO messages (room_id, sender_id, context) VALUES ($1, $2, $3) RETURNING message_id, send_at, is_read`;
      const params = [roomId, senderId, context];
      const rows = await db.query(query, params);
      if (rows.rowCount) return { success: true, rows: rows.rows };
    } catch (e) {
      console.log({ e });
    }
  },
  setRead: async ({ roomId, senderId }) => {
    try {
      const query = `UPDATE messages SET is_read=true WHERE room_id=$1 AND sender_id!=$2;`;
      const params = [roomId, senderId];
      const rows = await db.query(query, params);
      if (rows.rowCount) return { success: true, rows: rows.rows };
    } catch (e) {
      console.log({ e });
    }
  },
  setReadMemory: ({ room_id, sender_id, clients }) => {
    clients = clients.map((client) => {
      const roomIds = client.rooms.map((room) => room.room_id);
      const roomId = roomIds.filter((roomId) => +roomId === +room_id)[0];
      if (roomId) {
        client.messages = client.messages.map((message) => {
          if (
            +message.sender_id !== +sender_id &&
            +message.room_id === +room_id &&
            !message.is_read
          ) {
            return { ...message, is_read: true };
          }
          return message;
        });
      }
      return client;
    });
    return clients;
  },
  writeToMemory: ({ message, clients }) => {
    clients = clients.map((client) => {
      const roomIds = client.rooms.map((room) => room.room_id);
      const roomId = roomIds.filter(
        (roomId) => +roomId === +message.room_id
      )[0];
      let rooms = client.rooms;
      if (roomId) {
        rooms = client.rooms.map((room) => {
          if (+room.room_id === +roomId) {
            return { ...room, latestMessage: message };
          }
          return room;
        });

        client.messages.push(message);
        client.rooms = rooms;
      }
      return client;
    });
    return clients;
  },
  startChat: async ({ myId, otherId }) => {
    const queryIfAlreadyChat = `SELECT * from Room WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1);`;
    const paramsIfAlreadyChat = [myId, otherId];

    const { rows } = await db.query(queryIfAlreadyChat, paramsIfAlreadyChat);

    if (rows.length) return { isAlreadyExist: true, chatId: rows[0].room_id };

    const queryCreateChat = `INSERT INTO Room (user1_id, user2_id) VALUES ($1, $2) RETURNING room_id;`;
    const paramsCreateChat = [myId, otherId];
    const responce = await db.query(queryCreateChat, paramsCreateChat);
    if (responce.rowCount)
      return { isAlreadyExist: false, chatId: responce.rows[0].room_id };
  },

  addChatToMemory: ({ chatInfo, clients }) => {
    let users = clients.filter(
      (client) =>
        +client.id === +chatInfo.me.id || +client.id === +chatInfo.other.id
    );

    users = users.map((user) => {
      if (+user.id === +chatInfo.me.id) {
        user.rooms.push({
          room_id: chatInfo.chat_id,
          person_id: chatInfo.other.id,
          username: chatInfo.other.username,
          picture: chatInfo.other.picture,
          latestMessage: {},
        });
      } else if (+user.id === +chatInfo.other.id) {
        user.rooms.push({
          room_id: chatInfo.chat_id,
          person_id: chatInfo.me.id,
          username: chatInfo.me.username,
          picture: chatInfo.me.picture,
          latestMessage: {},
        });
      }
      return user;
    });

    return users;
  },
};
