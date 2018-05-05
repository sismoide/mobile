import questionAnswered from './question_answered.js'
import surveyCompleted from './survey_completed.js';


export default (response) => {
  return (dispatch, getState) => {
    dispatch(questionAnswered(response));
    const state = getState();
    console.log(state);
  }
}
