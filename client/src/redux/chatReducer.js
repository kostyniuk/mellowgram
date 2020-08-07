import {GET_CHATS } from './types';
import { arrToObj } from '../helpers/index';
const initialState = {};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS: {
      const { chats } = action.payload;

      const transformed = arrToObj(chats, 'room_id');

      return { ...state, ...transformed };
    }

    default: {
      return state;
    }
  }
};

export default chatReducer;
