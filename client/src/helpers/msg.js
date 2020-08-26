import { monthsNames } from './monthsNames.json';
import { daysNames } from './daysNames.json';

export const adjustTime = (date, type = 'message') => {
  if (!date) return null;

  if (type === 'chat') {
    const dateInstance = new Date(date);
    const now = new Date();

    if (dateInstance.getFullYear() !== now.getFullYear()) {
      return `${dateInstance.getDate()}.${dateInstance.getMonth()}.${
        dateInstance.getFullYear
      }`;
    } else if (now.getDate() - 7 > dateInstance.getDate()) {
      const month = dateInstance.getMonth();
      return `${dateInstance.getDate()}.${
        month.toString().length === 1 ? '0'.concat(month) : month
      }`;
    } else if (now.getDay() !== dateInstance.getDay()) {
      return daysNames[dateInstance.getDay()];
    }
  }

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

export const addTimeSeparator = (messages) => {
  const reduced = messages.reduce((prev, current) => {
    const currentMessageDate = {};
    const previousMessageDate = {};

    currentMessageDate.day = new Date(current.date).getDate();
    currentMessageDate.month = new Date(current.date).getMonth();
    currentMessageDate.year = new Date(current.date).getFullYear();

    const previousMessage = prev[prev.length - 1];

    if (prev.length === 0)
      return [
        ...prev,
        {
          type: 'separator',
          date: `${currentMessageDate.day} ${
            monthsNames[currentMessageDate.month]
          }`,
        },
        current,
      ];

    previousMessageDate.day = new Date(previousMessage.date).getDate();
    previousMessageDate.month = new Date(previousMessage.date).getMonth();
    previousMessageDate.year = new Date(previousMessage.date).getFullYear();

    if (previousMessageDate.day !== currentMessageDate.day) {
      return [
        ...prev,
        {
          type: 'separator',
          room_id: current.room_id,
          date: `${currentMessageDate.day} ${
            monthsNames[currentMessageDate.month]
          }`,
        },
        current,
      ];
    }

    if (previousMessageDate.month !== currentMessageDate.month) {
      return [
        ...prev,
        {
          type: 'separator',
          date: `${currentMessageDate.day} ${
            monthsNames[currentMessageDate.month]
          }`,
        },
        current,
      ];
    }

    if (previousMessageDate.year !== currentMessageDate.year) {
      return [
        ...prev,
        {
          type: 'separator',
          date: `${currentMessageDate.day} ${
            monthsNames[currentMessageDate.month]
          } ${currentMessageDate.year}`,
        },
        current,
      ];
    }

    return [...prev, current];
  }, []);

  return reduced;
};
