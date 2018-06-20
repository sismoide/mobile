/**
 * Stubs a basic instance of a quake, that can be later used
 * to create a specific mercalli or richter, full-blown quake report.
 * The reported quake is randomly generated, and located at a random
 * position on top of a circumference with center at `center`
 */
function _createBasicQuakeReportAround(center) {
  const distanceToCenter = 0.005;
  const randomCircumferenceAngle = Math.random() * 2 * Math.PI;
  return {
    depth: 300.34,
    timestamp: '2018-04-20T16:20+01:00',
    coordinates: {
      latitude: center.latitude + distanceToCenter * Math.sin(randomCircumferenceAngle),
      longitude: center.longitude + distanceToCenter * Math.cos(randomCircumferenceAngle)
    }
  }
}

function stubRichterQuakeReportAround(center) {
  return {
    type: QUAKE_TYPES.RICHTER,
    magnitude: (Math.random() * (9 - 1) + 1).toFixed(1), // random in [1, 9]
    ..._createBasicQuakeReportAround(center),
  }
}

function stubMercalliQuakeReportAround(center) {
  return {
    type: QUAKE_TYPES.MERCALLI,
    intensity: Math.floor(Math.random() * (12 - 1) + 1), // int in [1, 12]
    ..._createBasicQuakeReportAround(center),
  }
}


export const QUAKE_TYPES = {
  MERCALLI: 'MERCALLI',
  RICHTER: 'RICHTER'
};

export default {
  stubRichterQuakeReportAround,
  stubMercalliQuakeReportAround
};
