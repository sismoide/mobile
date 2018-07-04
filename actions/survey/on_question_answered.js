import questionAnswered from './question_answered.js'
import surveyCompleted from './survey_completed.js';
import modalsStartTransitioning from './modals_start_transitioning.js';
import modalsStopTransitioning from './modals_stop_transitioning.js';
import lastQuakeIntensityStored from './last_quake_intensity_stored.js';
import disableSurveyButton from '../home/disable_survey_button.js';
import notifySynchronizer from '../synchronizer/on_data_changed.js';

import Storage from '../../database/storage.js';

export default (response) => {
  return (dispatch, getState) => {
    dispatch(modalsStartTransitioning());
    setTimeout(async () => {
      dispatch(questionAnswered(response));
      const state = getState().survey;
      if (state.binarySearchLo >= state.binarySearchHi) {
        // This is the condition that determines completion.
        dispatch(surveyCompleted({ intensity: state.currentQuestion.intensity }));;
        try {
          await Storage.submitLatestQuakeIntensity(state.currentQuestion.intensity);
          dispatch(lastQuakeIntensityStored());
          dispatch(disableSurveyButton());
          dispatch(notifySynchronizer());
        } catch (error) { }
      }
      dispatch(modalsStopTransitioning())
    }, 100);
  }
}
