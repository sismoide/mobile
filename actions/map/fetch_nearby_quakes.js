import fetchNearbyQuakesRequest from './fetch_nearby_quakes_request.js';
import nearbyQuakesReceived from './nearby_quakes_received.js';

import StubQuakes from '../../stub/quake.js';
import { SHOW_STUB_QUAKES } from '../../config';

/**
 * Asks the server for nearby quakes close to `position`.
 */
export default (position) => {
  return dispatch => {
    dispatch(fetchNearbyQuakesRequest());
    if (SHOW_STUB_QUAKES) {
      dispatch(
        nearbyQuakesReceived(
          Array(5).fill(position).map(StubQuakes.stubRichterQuakeReportAround)
        )
      );
      return;
    }   
    // TODO: Actually make the http request.
  }
}
