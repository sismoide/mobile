import { 
  USER_LOCATION_REQUEST, 
  USER_LOCATION_RECEIVED,
  USER_LOCATION_ERROR
} from '../../actions/types.js';

const initialState = {
  userPosition: null,
  fetchingUserPosition: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_LOCATION_REQUEST: {
      return {
        ...state,
        fetchingUserPosition: true
      }
    }

    case USER_LOCATION_RECEIVED: {
      return {
        ...state,
        userPosition: action.payload.position,
        fetchingUserPosition: false
      }
    }

    case USER_LOCATION_ERROR: {
      return {
        ...state,
        fetchingUserPosition: false
      }
    }

    default: {
      return state;
    }
  }
}
