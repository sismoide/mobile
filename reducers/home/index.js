import { 
  GET_LAST_QUAKE_SUBMISSION_DATE_REQUEST,
  LAST_QUAKE_SUBMISSION_DATE_RECEIVED
} from '../../actions/types.js'

const initialState = {
  lastQuakeSubmissionDate: "...",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_QUAKE_SUBMISSION_DATE_REQUEST: {
      return state;
    }
    case LAST_QUAKE_SUBMISSION_DATE_RECEIVED: {
      return {
        ...state,
        lastQuakeSubmissionDate: action.payload.lastQuakeSubmissionDate
      }
    }
    default: {
      return state;
    }
  }
}
