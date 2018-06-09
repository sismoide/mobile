/**
 * Stubs the response of /mobile/nearby_quakes.
 * The reported quake is randomly generated, and located at a random
 * position on top of a circumference with center at `center`
 */
function createQuakeAround(center) {
  const distanceToCenter = 0.005;
  const randomCircumferenceAngle = Math.random() * 2 * Math.PI;
  return {
    magnitude: 8.87,
    depth: 300.34,
    timestamp: '2018-04-20T16:20+01:00',
    coordinates: {
      latitude: center.latitude + distanceToCenter * Math.sin(randomCircumferenceAngle),
      longitude: center.longitude + distanceToCenter * Math.cos(randomCircumferenceAngle)
    }
  }
}

export default {
  createQuakeAround
}
