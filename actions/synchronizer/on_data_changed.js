import synchronizerNotified from './synchronizer_notified.js';
import sendDataToServer from './send_data_to_server.js';

export default () => {
  return async dispatch => {
    dispatch(synchronizerNotified());
    dispatch(sendDataToServer());
  }
};
