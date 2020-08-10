import { SET_ONLINE } from './types';
const initialState = { ids: [] };

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONLINE: {
      const { onlineIds } = action.payload;
      console.log({ onlineIds });
      return { ...state, ids: onlineIds };
    }

    default: {
      return state;
    }
  }
};

export default chatReducer;
