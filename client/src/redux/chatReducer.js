import {
  GET_CHATS,
  ADD_MESSAGE,
  RESET_UNREAD_COUNTER,
  SET_ONLINE,
  ADD_CHAT,
} from './types';
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

        if (!messages.length) return { ...state, ...final };

        messages
          .filter((message) => +message.sender_id !== +me)
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

    //ADD_CHAT
    /*
    15{
  "room_id": "15",
  "person_id": 7,
  "picture": "/api/public/uploads/user_kostyniuk.jpg",
  "username": "kostyniuk",
  "latestMessage": {
    "message_id": "193",
    "room_id": 15,
    "sender_id": 8,
    "context": "time check 3",
    "send_at": "2020-08-10T13:43:35.690Z",
    "is_read": false
  },
  "unread": 0
}
    */

    case ADD_MESSAGE: {
      const { info, me } = action.payload;

      const temp = JSON.parse(JSON.stringify(state));
      temp[info.roomId].latestMessage = {
        message_id: info.messageId,
        room_id: info.roomId,
        sender_id: info.senderId,
        context: info.context,
        send_at: info.date,
        is_read: true,
      };

      if (+me.id !== +info.senderId) {
        temp[info.roomId].unread += 1;
      }

      return { ...state, ...temp };
    }

    case ADD_CHAT: {
      const { chat } = action.payload;

      const transformed = arrToObj([chat], 'room_id');
      console.log({ chat, transformed, state });

      return { ...state, ...transformed };
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
