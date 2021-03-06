import { SET_SEARCH_RESULTS } from './types';

const initialState = {
  dispatched: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS: {
      const { results } = action.payload;

      return { ...results, dispatched: true };
    }

    default: {
      return state;
    }
  }
};

export default searchReducer;
