import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import disableQuakeButton from './disable_quake_button.js';
import enableQuakeButton from './enable_quake_button.js';
import enableSurveyButton from './enable_survey_button.js';
import resetSurveyValues from './reset_survey_values.js';

import Storage from '../../database/storage.js';
import Synchronizer from '../../synchronizer';

export default (navigation) => {
  return dispatch => {
    if (!navigator.geolocation) {
      Alert.alert("Geolocalización desactivada. Función no disponible");
      return;
    }
    dispatch(disableQuakeButton());
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await Storage.submitQuakeReport({
            latitude: `${ pos.coords.latitude }`,
            longitude: `${ pos.coords.longitude }`
          });
          Synchronizer.onDataChange();
        } catch (error) {}
        navigation.dispatch( NavigationActions.navigate({ routeName: 'Survey' }) );
        dispatch(enableQuakeButton());
		dispatch(resetSurveyValues());
		dispatch(enableSurveyButton());
      }
    );
  }
}