const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const query = 'SELECT * FROM Interest ORDER BY interest_id;';
    const { rows } = await db.query(query, []);

    return res.json({ success: true, interests: rows });
  } catch (e) {
    res.json({ success: false, msg: e });
  }
});

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const query = `SELECT * FROM interest WHERE interest_id in (SELECT interest_id FROM users_interests_map WHERE user_id = (SELECT user_id FROM user_info WHERE username = $1)) ORDER BY interest_id;`;

    const { rows } = await db.query(query, [username]);

    res.json({ success: true, interests: rows });
  } catch (e) {
    res.json({ success: false, msg: e });
    console.log(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { interests_ids } = req.body;

    const promises = [];

    const deleting = await db.query(
      `DELETE FROM Users_Interests_Map WHERE user_id = $1`,
      [user_id]
    );
    interests_ids.forEach((interest_id) => {
      const query = `INSERT INTO Users_Interests_Map (user_id, interest_id) VALUES ($1, $2);`;
      promises.push(db.query(query, [user_id, interest_id]));
    });

    const responce = await Promise.all(promises);

    if (responce[0].rowCount) {
      return res.json({ success: true, responce });
    }
    return res.json({ success: false, responce });
  } catch (e) {
    if (e.code === '23505') {
      return res.json({ success: true, msg: e });
    }
    res.json({ success: false, msg: e });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { user_id } = req.user;

    const responce = await db.query(
      `DELETE FROM Users_Interests_Map WHERE user_id = $1`,
      [user_id]
    );

    if (responce.command) {
      return res.json({ success: true, msg: 'Activities deleted' });
    }
    return res.json({ success: false, responce });
  } catch (e) {
    if (e.code === '23505') {
      return res.json({ success: true, msg: e });
    }
    res.json({ success: false, msg: e });
  }
});

/*
SELECT * FROM (SELECT user_info.user_id, user_info.username, pers.fullname, pers.occupation, pers.based_in, pers.picture, COUNT(uim.interest_id) as matched FROM User_info INNER JOIN Person pers ON pers.person_id = user_info.user_id INNER JOIN Users_interests_map uim ON uim.user_id = user_info.user_id INNER JOIN Interest int ON int.interest_id = uim.interest_id WHERE (int.interest_id IN (1, 2, 3)) GROUP BY user_info.user_id, pers.fullname, pers.occupation, pers.based_in, pers.picture ORDER BY COUNT(uim.interest_id) DESC) AS Info_and_matched INNER JOIN users_interests_map ium ON ium.user_id = Info_and_matched.user_id WHERE Info_and_matched.matched >= 1 ORDER BY Info_and_matched.matched DESC;

*/

/*SELECT * FROM (SELECT user_info.user_id, user_info.username, pers.fullname, pers.occupation, pers.based_in, pers.picture, COUNT(uim.interest_id) as matched FROM User_info INNER JOIN Person pers ON pers.person_id = user_info.user_id INNER JOIN Users_interests_map uim ON uim.user_id = user_info.user_id INNER JOIN Interest int ON int.interest_id = uim.interest_id WHERE (int.interest_id IN (1)) GROUP BY user_info.user_id, pers.fullname, pers.occupation, pers.based_in, pers.picture ORDER BY COUNT(uim.interest_id) DESC LIMIT 2) AS Info_and_matched INNER JOIN users_interests_map ium ON ium.user_id = Info_and_matched.user_id WHERE Info_and_matched.matched >= 1 ORDER BY Info_and_matched.matched DESC;

*/

/*
SELECT * FROM (SELECT user_info.user_id, user_info.username, pers.fullname, pers.occupation, pers.based_in, pers.picture, COUNT(uim.interest_id) as matched FROM User_info INNER JOIN Person pers ON pers.person_id = user_info.user_id INNER JOIN Users_interests_map uim ON uim.user_id = user_info.user_id INNER JOIN Interest int ON int.interest_id = uim.interest_id WHERE (int.interest_id IN (1) AND pers.based_in LIKE '%, UA%') GROUP BY user_info.user_id, pers.fullname, pers.occupation, pers.based_in, pers.picture ORDER BY COUNT(uim.interest_id) DESC LIMIT 2) AS Info_and_matched INNER JOIN users_interests_map ium ON ium.user_id = Info_and_matched.user_id WHERE Info_and_matched.matched >= 1 ORDER BY Info_and_matched.matched DESC;

*/
module.exports = router;
