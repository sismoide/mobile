import fetchNearbyReportsRequest from './fetch_nearby_reports_request';
import nearbyReportsReceived from './nearby_reports_received.js';
import nearbyReportsError from './nearby_reports_error.js';

import ServerAPI from '../../serverAPI/ServerAPI.js';
import StubQuakes from '../../stub/quake.js';
import { SHOW_STUB_REPORTS } from '../../config';

export default (position) => {
  return async (dispatch, getState) => {
    dispatch(fetchNearbyReportsRequest());
    if (SHOW_STUB_REPORTS) {
      dispatch(
        nearbyReportsReceived(
          Array(5).fill(position).map(StubQuakes.stubMercalliQuakeReportAround)
        )
      );
      return;
    }
    const userToken = getState().authentication.userToken;
    if (!userToken) {
      dispatch(nearbyReportsError('No user token'));
      return;
    }
    if (!position) {
      dispatch(nearbyReportsError('No user location'));
      return;
    }
    try {
      dispatch(nearbyReportsReceived(
        await ServerAPI.fetchNearbyReports(userToken, position)));
    } catch (error) {
      dispatch(nearbyReportsError(error));
    }
  }
}
