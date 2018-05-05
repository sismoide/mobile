import { NavigationActions } from 'react-navigation';

import surveyDismissed from './survey_dismissed.js';

export default (navigation) => {
  return dispatch => {
    navigation.dispatch(NavigationActions.back());
    dispatch(surveyDismissed());
  }
}
