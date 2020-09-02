export const deleteProperties = (obj, props) => {
  props.map((prop) => delete obj[prop]);
  return obj;
};

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const adjustToTable = (obj) =>
  Object.keys(obj).map((field, i) => ({ field, value: obj[field] }));

export const sleep = (msec) =>
  new Promise((resolve) => {
    setTimeout(resolve, msec);
  });

export const arrToObj = (arr, prop = 'post_id') => {
  let final = {};
  if (!arr) return {};
  arr.forEach((post) => {
    final[post[prop]] = post;
  });

  return final;
};

export const getTotalUnread = (chats) => {
  return chats.reduce((prev, cur) => {
    return cur.unread + prev;
  }, 0);
};

export const rapidApiHeaders = () => ({
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': localStorage.getItem('RAPID_API_KEY'),
  },
});

export const sortByProp = (arr, prop) => arr.sort((a, b) => b[prop] - a[prop]);
