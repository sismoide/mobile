import {
  DISABLE_QUAKE_BUTTON,
  ENABLE_QUAKE_BUTTON,
  DISABLE_SURVEY_BUTTON,
  ENABLE_SURVEY_BUTTON
} from '../../actions/types.js'

const initialState = {
  fetchingPosition:false,
  pendingSurvey:false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_QUAKE_BUTTON: {
      return {
        ...state,
        fetchingPosition: true
      }
    }
    case ENABLE_QUAKE_BUTTON: {
      return {
        ...state,
        fetchingPosition: false
      }
    }
    case DISABLE_SURVEY_BUTTON: {
      return {
        ...state,
        pendingSurvey: false
      }
    }
    case ENABLE_SURVEY_BUTTON: {
      return {
        ...state,
        pendingSurvey: true
      }
    }
    default: {
      return state;
    }
  }
}
