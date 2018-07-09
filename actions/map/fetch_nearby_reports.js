import fetchNearbyReportsRequest from './fetch_nearby_reports_request';
import nearbyReportsReceived from './nearby_reports_received.js';

import ServerAPI from '../../serverAPI/ServerAPI.js';
import StubQuakes from '../../stub/quake.js';
import { SHOW_STUB_QUAKES } from '../../config';

export default (position) => {
  return async (dispatch, getState) => {
    dispatch(fetchNearbyReportsRequest());
    if (SHOW_STUB_QUAKES) {
      dispatch(
        nearbyReportsReceived(
          Array(5).fill(position).map(StubQuakes.stubMercalliQuakeReportAround)
        )
      );
      return;
    }
  }
}
