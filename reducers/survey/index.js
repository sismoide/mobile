import { 
  QUESTION_ANSWERED, 
  SURVEY_COMPLETED,
  MODALS_START_TRANSITIONING,
  MODALS_STOP_TRANSITIONING,
  RESET_SURVEY_VALUES
} from '../../actions/types.js';
import questions from './questions.js';

const initialState = () => {
  const binarySearchMid = Math.floor((questions.length - 1) / 2);
  const currentQuestion = questions[binarySearchMid];
  return {
    currentQuestion,
    surveyResults: null,
    binarySearchLo: 0,
    binarySearchHi: questions.length - 1,
    binarySearchMid,
    modalsTransitioning: false
  }
}

export default (state = initialState(), action) => {
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
        binarySearchMid: mid,
        currentQuestion: Object.assign({}, questions[mid])
      }
    }

    case MODALS_START_TRANSITIONING: {
      return {
        ...state,
        modalsTransitioning: true
      }
    }

    case MODALS_STOP_TRANSITIONING: {
      return {
        ...state,
        modalsTransitioning: false
      }
    }

    case RESET_SURVEY_VALUES: {
      const binarySearchMid = Math.floor((questions.length - 1) / 2);
      const currentQuestion = questions[binarySearchMid]; 
      return {
        ...state,
        binarySearchLo: 0,
        binarySearchHi: questions.length - 1,
        binarySearchMid,
        surveyResults: null,
        currentQuestion,
        modalsTransitioning: false
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
