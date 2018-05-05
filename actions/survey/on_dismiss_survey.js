import { NavigationActions } from 'react-navigation';

import dismissSurveyRequest from './dismiss_survey_request.js';
import surveyDismissed from './survey_dismissed.js';

export default (navigation) => {
  return dispatch => {
    dispatch(dismissSurveyRequest());
    navigation.dispatch(NavigationActions.back());
    dispatch(surveyDismissed());
  }
}
