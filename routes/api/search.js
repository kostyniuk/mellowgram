const express = require('express');

const db = require('../../config/db');
const {
  based_inRegExp,
  isMatchAll,
  prepareResponce,
} = require('../../lib/search');
const { formParams } = require('../../lib/sqlUtils');

const router = express.Router();

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

    const { rows } = await db.query(query, params);

    const data = prepareResponce(rows);

    res.json({ success: true, data });
  } catch (e) {
    console.log({ e });
    res.json({ success: false, e });
  }
});

module.exports = router;
