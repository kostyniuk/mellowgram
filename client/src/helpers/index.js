module.exports = {
  deleteProperties: (obj, props) => {
    props.map((prop) => delete obj[prop]);
    return obj;
  },
  deepCopy: (obj) => JSON.parse(JSON.stringify(obj)),
  adjustToTable: (obj) =>
    Object.keys(obj).map((field, i) => ({ field, value: obj[field] })),
  sleep: (msec) =>
    new Promise((resolve) => {
      setTimeout(resolve, msec);
    }),
  arrToObj: (arr, prop = 'post_id') => {
    let final = {};
    if (!arr) return {};
    arr.forEach((post) => {
      final[post[prop]] = post;
    });

    return final;
  },
};
