import { GET_MESSAGES, ADD_MESSAGE, ADD_CHAT } from './types';
import { arrToObj } from '../helpers/index';
const initialState = {};

const adjustTime = (date) => {
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

const addTimeSeparator = (messages) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const reduced = messages.reduce((prev, current) => {

    const currentMessageDate = {};
    const previousMessageDate = {};

    currentMessageDate.day = new Date(current.date).getDate();
    currentMessageDate.month = new Date(current.date).getMonth();
    currentMessageDate.year = new Date(current.date).getFullYear();

    const previousMessage = prev[prev.length - 1];

    if (prev.length === 0) return [...prev, {
      type: 'separator',
      date: `${currentMessageDate.day} ${
        monthNames[currentMessageDate.month]
      }`,
    }, current];

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
            monthNames[currentMessageDate.month]
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
            monthNames[currentMessageDate.month]
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
            monthNames[currentMessageDate.month]
          } ${currentMessageDate.year}`,
        },
        current,
      ];
    }

    return [...prev, current];
  }, []);

  return reduced;
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES: {
      const { messages, chats } = action.payload;

      const adjustedMessages = messages
        .sort((a, b) => a.message_id - b.message_id)
        .map((message) => ({
          message_id: message.message_id,
          room_id: message.room_id,
          from: message.sender_id,
          text: message.context,
          date: message.send_at,
        }));

      const final = chats.map((chat) => {
        const currentChat = adjustedMessages.filter(
          (message) => +message.room_id === +chat.room_id
        );

        return {
          room_id: +chat.room_id,
          username: chat.username,
          picture: chat.picture,
          messages: currentChat,
        };
      });

      let withSeparators = final.map((chat) => {
        chat.messages = addTimeSeparator(chat.messages);
        return chat;
      });

      withSeparators = withSeparators.map((chat) => {
        chat.messages = chat.messages.map((message) => {
          if (!message.type) return { ...message, date: adjustTime(message.date) };
          return message;
        });
        return chat;
      });

      const obj = arrToObj(withSeparators, 'room_id');
      return { ...state, ...obj };
    }

    case ADD_MESSAGE: {
      const { info } = action.payload;

      const temp = { ...state };

      temp[info.roomId].messages.push({
        message_id: info.messageId,
        room_id: info.roomId,
        from: info.senderId,
        text: info.context,
        date: info.date,
      });

      return { ...state, ...temp };
    }

    case ADD_CHAT: {
      const { chat } = action.payload;

      const { latestMessage, unread, person_id, ...messages } = chat;

      messages.messages = [];

      const transformed = arrToObj([messages], 'room_id');

      return { ...state, ...transformed };
    }

    default: {
      return state;
    }
  }
};

export default messagesReducer;
