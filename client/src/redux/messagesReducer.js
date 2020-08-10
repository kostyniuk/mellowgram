import { GET_MESSAGES, ADD_MESSAGE } from './types';
import { arrToObj } from '../helpers/index';
const initialState = {};

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
          date: message.send_at.split('T')[1].split('.')[0],
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

      const obj = arrToObj(final, 'room_id');
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

      console.log({ temp });

      return { ...state, ...temp };
    }

    default: {
      return state;
    }
  }
};

export default messagesReducer;
