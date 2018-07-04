import connectionStatusChanged from './connection_status_changed.js';
import sendDataToServer from './send_data_to_server.js';


export default (newStatus) => {
  return dispatch => {
    dispatch(connectionStatusChanged(newStatus));
    dispatch(sendDataToServer());
  }
}
