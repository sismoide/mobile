import {
  USER_TOKEN_RECEIVED,
} from '../../actions/types.js';

const initialState = {
  userToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_TOKEN_RECEIVED: {
      return {
        ...state,
        userToken: action.payload.token
      }
    }

    default: {
      return state;
    }
  }
}
