import questionAnswered from './question_answered.js'
import surveyCompleted from './survey_completed.js';
import modalsStartTransitioning from './modals_start_transitioning.js';
import modalsStopTransitioning from './modals_stop_transitioning.js';


export default (response) => {
  return (dispatch, getState) => {
    dispatch(modalsStartTransitioning());
    setTimeout(() => {
      dispatch(questionAnswered(response));
      const state = getState().survey;
      if (state.binarySearchLo >= state.binarySearchHi) {
        dispatch(surveyCompleted({ intensity: state.currentQuestion.intensity }));;
      }
      dispatch(modalsStopTransitioning())
    }, 100);
  }
}
