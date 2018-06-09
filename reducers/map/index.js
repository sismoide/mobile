import { NEARBY_QUAKES_RECEIVED, FETCH_NEARBY_QUAKES_REQUEST } from '../../actions/types.js';

const initialState = {
  quakes: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEARBY_QUAKES_REQUEST: {
      return state;
    }
    
    case NEARBY_QUAKES_RECEIVED: {
      return {
        ...state,
        quakes: action.payload.quakes
      }
    }

    default: {
      return state;
    }
  }
}
