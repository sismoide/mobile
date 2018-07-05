import faker from 'faker';

function _createBasicLandmarkAround(center) {
  const distanceToCenter = 0.008;
  const randomCircumferenceAngle = Math.random() * 2 * Math.PI;
  return {
    coordinates: {
      latitude: center.latitude + distanceToCenter * Math.sin(randomCircumferenceAngle),
      longitude: center.longitude + distanceToCenter * Math.cos(randomCircumferenceAngle)
    }
  }
}

function randomStubLandmarkAround(center) {
  const landmarkTypes = Object.keys(mapLandmarkTypeToReadable);
  const randomLandmarkType = 
    landmarkTypes[ Math.floor(Math.random() * landmarkTypes.length) ];
  return {
    ..._createBasicLandmarkAround(center),
    name: `${ mapLandmarkTypeToReadable[randomLandmarkType] } ${ faker.company.companyName() }`,
    type: randomLandmarkType
  }
}

const mapLandmarkTypeToReadable = {
  hospital: 'Hospital',
  waterSource: 'Fuente de Agua',
  gasStation: 'Bencinera'
}

export default {
  randomStubLandmarkAround,
}
