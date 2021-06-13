'use strict';

module.exports = (str) => {
  const { monthsNames } = require('./monthsNames');
  const date = new Date(str);
  const now = Date.now(); // db has -3 hours to mine
  const diff = now - date.getTime();

  const seconds = diff / 1000;

  if (seconds > 60) {
    const minutes = seconds / 60;
    if (minutes > 60) {
      const hours = minutes / 60;
      if (hours > 24) {
        const days = hours / 24;
        if (days > 7) {
          let fullDate = `${date.getDate()} ${monthsNames[date.getMonth()]}`;
          console.log({date, fullDate})
          if (date.getFullYear() !== new Date().getFullYear()) {
            fullDate = fullDate.concat(` ${date.getFullYear()}`);
          }
          return { fullDate };
        }
        return { days: Math.floor(days) };
      }
      return { hours: Math.floor(hours) };
    }
    return { minutes: Math.floor(minutes) };
  }
  return { seconds: Math.floor(seconds) };
};
