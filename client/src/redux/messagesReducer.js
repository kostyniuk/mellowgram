import { GET_MESSAGES } from './types';
import { arrToObj } from '../helpers/index';
const initialState = {};

/*
{
    room_id: 4,
    username: 'steph',
    picture:
      'http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg',
    messages: [
      { id: 1, from: 8, text: 'STEPH MESSAGE 1', date: '3:22 am' },
      {
        id: 2,
        from: 12,
        text: 'STEPH MESSAGE 1',
        date: '13:22 am',
      },
    ],
  },
*/

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES: {
      const { messages, chats } = action.payload;

      const adjustedMessages = messages.map((message) => ({
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
        console.log({ currentChat });

        return {
          room_id: +chat.room_id,
          username: chat.username,
          picture: chat.picture,
          messages: currentChat,
        };
      });

      console.log({ final });
      const obj = arrToObj(final, 'room_id');
      console.log({ obj });
      return { ...state, ...obj };
    }

    default: {
      return state;
    }
  }
};

export default messagesReducer;
