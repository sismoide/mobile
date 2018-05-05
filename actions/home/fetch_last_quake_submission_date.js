import moment from 'moment-timezone';

import getLastQuakeSubmissionDateRequest from './get_last_quake_submission_date_request.js';
import lastQuakeSubmissionDateReceived from './last_quake_submission_date_received.js';

import Config from '../../config';
import Storage from '../../database/storage.js';

export default () => {
  return async dispatch => {
    dispatch(getLastQuakeSubmissionDateRequest());
    const latestTimestamp = await Storage.getLatestQuakeSubmissionTimestamp();
    if (latestTimestamp) {
      dispatch(
        lastQuakeSubmissionDateReceived(
          moment(latestTimestamp)
          .tz(Config.LOCALE)
          .calendar()
          .toLocaleString()
        )
      );
    } else {
      dispatch(lastQuakeSubmissionDateReceived('nunca'));
    }
  }
}
