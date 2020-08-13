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
  getTotalUnread: (chats) =>
    chats.reduce((prev, cur) => {
      return cur.unread + prev;
    }, 0),
  adjustTime: (date) => {
    if (!date) return null;

    const withoutTimeZone = date
      .split('T')[1]
      .split('.')[0]
      .split(':')
      .slice(0, 2);

    const myTime = withoutTimeZone.map((num, i) => {
      if (i === 0) {
        return (Number(num) + 6).toString();
      }
      return num;
    });

    return myTime.join(':');
  },
  prepareText: (str) => {
    if (!str) return 'No messages yet';

    if (str.length > 34) {
      return str.toString().substring(0, 36).concat('...');
    } else {
      return str;
    }
  },

  sortChatsByLatestMessage: (a, b) => {
    const compare =
      a.latestMessage?.send_at < b.latestMessage?.send_at ? 1 : -1;
    return compare;
  },
};
