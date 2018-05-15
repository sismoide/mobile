import {
  DISABLE_QUAKE_BUTTON,
  ENABLE_QUAKE_BUTTON
} from '../../actions/types.js'

const initialState = {
  fetchingPosition:false,
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
    default: {
      return state;
    }
  }
}
