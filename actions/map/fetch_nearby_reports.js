import fetchNearbyReportsRequest from './fetch_nearby_reports_request';
import nearbyReportsReceived from './nearby_reports_received.js';

import StubQuakes from '../../stub/quake.js';
import { SHOW_STUB_QUAKES } from '../../config';

export default (position) => {
  return dispatch => {
    dispatch(fetchNearbyReportsRequest());
    if (SHOW_STUB_QUAKES) {
      dispatch(
        nearbyReportsReceived(
          Array(5).fill(position).map(StubQuakes.stubMercalliQuakeReportAround)
        )
      );
      return;
    }
    // TODO: do the http request
  }
}
