export const adjustTime = (date) => {
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
};

export const prepareText = (str) => {
  if (!str) return 'No messages yet';

  if (str.length > 34) {
    return str.toString().substring(0, 36).concat('...');
  } else {
    return str;
  }
};
