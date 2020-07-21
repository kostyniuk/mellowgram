module.exports = {
  deleteProperties: (obj, props) => {
    props.map((prop) => delete obj[prop]);
    return obj;
  },
  deepCopy: (obj) => JSON.parse(JSON.stringify(obj)),
  adjustToTable: (obj) =>
    Object.keys(obj).map((field, i) => ({ field, value: obj[field] })),
};
