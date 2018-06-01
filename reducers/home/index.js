import { 
  GET_LAST_QUAKE_SUBMISSION_DATE_REQUEST,
  LAST_QUAKE_SUBMISSION_DATE_RECEIVED,
  DISABLE_SURVEY_BUTTON,
  ENABLE_SURVEY_BUTTON
} from '../../actions/types.js'

const initialState = {
  lastQuakeSubmissionDate: "...",
  surveyButtonAvailable: false
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

    case DISABLE_SURVEY_BUTTON: {
      return {
        ...state,
        surveyButtonAvailable: false
      }
    }

    case ENABLE_SURVEY_BUTTON: {
      return {
        ...state,
        surveyButtonAvailable: true
      }
    }

    default: {
      return state;
    }
  }
}
