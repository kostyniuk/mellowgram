const initialState = {
  isAutheticated: false,
  id: null,
  username: null,
  ready: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        isAuthenticated: true,
        id: action.payload.id,
        username: action.payload.username,
        ready: true,
      };
    default: {
      return { ...state, ready: true };
    }
  }
};

export default userReducer;
