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

      return null;
    } catch (e) {
      console.log(e);
    }
  },
  getTheLatestMessages: ({ rooms, messages }) => {
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
  },
  removeFromClients: (uuid, clients) =>
    clients.filter((client) => client.uuid !== uuid),
};
