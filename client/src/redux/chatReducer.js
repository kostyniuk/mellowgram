import { GET_CHATS, ADD_MESSAGE, RESET_UNREAD_COUNTER } from './types';
import { arrToObj } from '../helpers/index';
const initialState = {};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS: {
      const { chats, messages, me } = action.payload;

      const transformed = arrToObj(chats, 'room_id');

      const addNumOfUnread = (messages) => {
        let final = { ...transformed };

        for (const chatObj in final) {
          final[chatObj] = { ...final[chatObj], unread: 0 };
        }

        messages
          .filter((message) => message.sender_id !== me.id)
          .filter((message) => !message.is_read)
          .map((message) => {
            if (Object.keys(final).includes(message.room_id.toString())) {
              final[message.room_id].unread++;
            }
          });

        return final;
      };

      const patched = addNumOfUnread(messages);

      return { ...state, ...patched };
    }

    case ADD_MESSAGE: {
      const { info } = action.payload;

      const temp = JSON.parse(JSON.stringify(state));
      temp[info.roomId].latestMessage = {
        message_id: info.messageId,
        room_id: info.roomId,
        sender_id: info.senderId,
        context: info.context,
        send_at: info.date,
        is_read: true,
      };

      return { ...state, ...temp };
    }

    case RESET_UNREAD_COUNTER: {
      const { chatId } = action.payload;

      const reseted = JSON.parse(JSON.stringify(state));

      reseted[chatId].unread = 0;

      return { ...state, ...reseted };
    }

    default: {
      return state;
    }
  }
};

export default chatReducer;
