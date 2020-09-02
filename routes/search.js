const express = require('express');
const { formParams } = require('../lib/sqlUtils');
const db = require('../config/db');

const router = express.Router();
/*
SELECT * FROM (SELECT user_info.user_id, user_info.username, pers.fullname, pers.occupation, pers.based_in, pers.picture, COUNT(uim.interest_id) as matched FROM User_info INNER JOIN Person pers ON pers.person_id = user_info.user_id INNER JOIN Users_interests_map uim ON uim.user_id = user_info.user_id INNER JOIN Interest int ON int.interest_id = uim.interest_id WHERE (int.interest_id IN (1) AND pers.based_in LIKE '%, UA%') GROUP BY user_info.user_id, pers.fullname, pers.occupation, pers.based_in, pers.picture ORDER BY COUNT(uim.interest_id) DESC LIMIT 2) AS Info_and_matched INNER JOIN users_interests_map ium ON ium.user_id = Info_and_matched.user_id WHERE Info_and_matched.matched >= 1 ORDER BY Info_and_matched.matched DESC;
*/
/*
const addParameters = formParams(userIds.length, 2);

    const queryPosts = `SELECT post_id, creator_id, caption, created_at, number_of_likes FROM Post
    WHERE creator_id in (${addParameters})
    ORDER BY post_id DESC OFFSET $1 LIMIT $2;`;
    const parametrsPosts = [offset, limit, ...userIds];
*/

const based_inRegExp = ({ country, city }) => {
  console.log({ country, city });

  if (country === 'any') {
    return '%';
  } else if (country !== 'any' && city === 'any') {
    return `%${country}%`;
  } else {
    return `${city}, ${country}`;
  }
};

const isMatchAll = (bool, num) => {
  if (bool === 'true') return `= ${num}`;
  return '>= 1';
};

const prepareQuery = ({
  interests,
  matchAll,
  country,
  city,
  user_id,
  limit = 9,
  offset = 0,
}) => {
  const addParameters = formParams(interests.length, 3);

  let query = `SELECT * FROM (SELECT * FROM (SELECT user_info.user_id, user_info.username, pers.fullname, pers.occupation, pers.based_in, pers.picture, COUNT(uim.interest_id) as matched FROM User_info INNER JOIN Person pers ON pers.person_id = user_info.user_id INNER JOIN Users_interests_map uim ON uim.user_id = user_info.user_id INNER JOIN Interest int ON int.interest_id = uim.interest_id WHERE (int.interest_id IN (${addParameters}) AND pers.based_in LIKE '${based_inRegExp(
    { country, city }
  )}' AND user_info.user_id != $1) GROUP BY user_info.user_id, pers.fullname, pers.occupation, pers.based_in, pers.picture ORDER BY COUNT(uim.interest_id) DESC LIMIT $2 OFFSET $3) AS Info_and_matched INNER JOIN users_interests_map ium ON ium.user_id = Info_and_matched.user_id WHERE Info_and_matched.matched ${isMatchAll(
    matchAll,
    interests.length
  )} ORDER BY Info_and_matched.matched DESC) AS Matched_wo_Interests INNER JOIN Interest int ON int.interest_id = Matched_wo_Interests.interest_id`;
  let params = [user_id, limit, offset, ...interests];

  console.log();

  return [query, params];
};

router.get('/', async (req, res, next) => {
  try {
    const { user_id } = req.user;

    const { interests, matchAll, country, city } = req.query;

    const limit = 9;
    const offset = 0;

    const [query, params] = prepareQuery({
      interests: interests.split(','),
      matchAll,
      country,
      city,
      user_id,
      limit,
      offset,
    });

    console.log({ query, params });

    const { rows } = await db.query(query, params);

    console.log({ rows });
    const prepareResponce = (arr) => {
      const map = {};

      arr.map((interestsInfo) => {
        if (!map[interestsInfo.user_id])
          map[interestsInfo.user_id] = { ...interestsInfo };
      });

      console.log({ map });
    };

    prepareResponce(rows);
    res.json({ interests: interests.split(','), matchAll, country, city });
  } catch (e) {
    console.log({ e });
    res.json({ success: false, e });
  }
});

module.exports = router;
