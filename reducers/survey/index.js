import { QUESTION_ANSWERED, SURVEY_COMPLETED } from '../../actions/types.js';
import questions from './questions.js';

const initialState = {
  questions,
  shouldShowModal: false,
  binarySearchLo: 0,
  binarySearchHi: questions.length - 1,
  binarySearchMid: Math.floor((questions.length - 1) / 2),
  surveyResults: null
}


export default (state = initialState, action) => {
  switch(action.type) {
    case QUESTION_ANSWERED: {
      let lo = state.binarySearchLo;
      let hi = state.binarySearchHi;
      let mid = state.binarySearchMid;
      if (action.payload.response === 'NO') {
        hi = mid;
      } else if (action.payload.response === 'YES'){
        lo = mid + 1;
      } else {
        // Invalid payload? Do nothing.
        return state;
      }
      mid = Math.floor((hi + lo) / 2);
      return {
        ...state,
        binarySearchLo: lo,
        binarySearchHi: hi,
        binarySearchMid: mid
      }
    }

    case SURVEY_COMPLETED: {
      return {
        ...state,
        surveyResults: action.payload.surveyResults
      }
    }

    default: {
      return state;
    }
  }
}
