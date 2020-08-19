'use strict';

const db = require('../config/db');

module.exports = {
  findIdByUserName: async (nickname) => {
    const queryUser = `SELECT user_id from user_info WHERE username = $1;`;
    const valuesUser = [nickname];
    let { rows } = await db.query(queryUser, valuesUser);
    if (rows.length === 0) {
      return null;
    }
    return rows[0].user_id;
  },

  personInfoById: async (id, res) => {
    const queryUser = `SELECT * from person WHERE person_id = $1;`;
    const valuesUser = [id];
    let { rows } = await db.query(queryUser, valuesUser);
    let info = rows[0];
    return info;
  },
  formParams: (n, offset = 0) => {
    let s = `$${offset + 1}`;
    for (let i = offset + 2; i <= n + offset; i++) {
      s += `, $${i}`;
    }
    return s;
  },
};
