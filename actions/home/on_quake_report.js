import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import enableSurveyButton from './enable_survey_button.js';
import resetSurveyValues from '../survey/reset_survey_values.js';

import Storage from '../../database/storage.js';
import Synchronizer from '../../synchronizer';

export default (userPosition, navigation) => {
  return async dispatch => {
    try {
      await Storage.submitQuakeReport(userPosition);
      Synchronizer.onDataChange();
      Alert.alert(
        'Tu reporte ha sido enviado!',
        'Te gustaría calcular la intensidad del sismo?',
        [
          {text: 'No, gracias', style: 'cancel'},
          {text: 'Sí!', onPress: () => navigation.dispatch( NavigationActions.navigate({ routeName: 'Survey' }) )}
        ]
      )
      dispatch(resetSurveyValues());
      dispatch(enableSurveyButton());
    } catch (error) {
      // TODO: better handling
      console.error(error);
    }
  }
}
