import { 
  NEARBY_QUAKES_RECEIVED, 
  NEARBY_LANDMARKS_RECEIVED,
  FETCH_NEARBY_QUAKES_REQUEST,
  NEARBY_REPORTS_RECEIVED,
} from '../../actions/types.js';

const initialState = {
  quakes: [],
  reports: [],
  landmarks: [],

  receivedLandmarksFromServer: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEARBY_REPORTS_RECEIVED: {
      return {
        ...state,
        reports: action.payload.reports
      }
    }
    
    case NEARBY_QUAKES_RECEIVED: {
      return {
        ...state,
        quakes: action.payload.quakes
      }
    }

    case NEARBY_LANDMARKS_RECEIVED: {
      return {
        ...state,
        landmarks: action.payload.landmarks,
        receivedLandmarksFromServer: true
      }
    }

    default: {
      return state;
    }
  }
}
