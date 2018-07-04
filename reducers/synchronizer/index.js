import {
  CONNECTION_STATUS_CHANGED,
} from '../../actions/types.js';

const initialState = {
  connectionStatus: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case CONNECTION_STATUS_CHANGED: {
      return {
        ...state,
        connectionStatus: action.payload.status
      }
    }
    default: { 
      return state;
    }
  }
}
