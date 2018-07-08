import { AsyncStorage } from 'react-native';

import attemptingToSendData from './attempting_to_send_data.js';
import synchronizerError from './synchronizer_error.js';
import quakeReportsSent from './quake_reports_sent.js';
import intensitiesSentToServer from './intensities_sent_to_server.js';

import Storage from '../../database/storage.js';
import ServerAPI from '../../serverAPI/ServerAPI.js';

const SENT_QUAKES_KEY = '@QuakeReports:sentQuakes';
const SENT_INTENSITIES_KEY = '@QuakeReports:sentIntensities';
const MAP_LOCAL_QUAKE_ID_TO_SERVER_QUAKE_ID 
  = '@QuakeReports:mapLocalQuakeIdToServerQuakeId';

export default () => {
  return async (dispatch, getState) => {
    dispatch(attemptingToSendData());
    const userToken = getState().authentication.userToken;
    if (!userToken) {
      dispatch(synchronizerError('User not authenticated'));
      return;
    }
    const allQuakeReports = await Storage.getQuakeReports();
    if (allQuakeReports.length > 0) {
      const sentQuakesInfo = await sendQuakeReports(allQuakeReports, userToken);
      if (sentQuakesInfo.length > 0) {
        console.log(`${ sentQuakesInfo.length } quake reports were succesfully sent.`);
        dispatch(quakeReportsSent(sentQuakesInfo));
      }
    } else {
      dispatch(
        synchronizerError(
          'Quake reports not sent because there are no stored quake reports'));
    }

    const allIntensities = await Storage.getIntensities();
    if (allIntensities.length > 0) {
      const sentIntensitiesInfo = await sendIntensities(allIntensities, userToken);
      if (sentIntensitiesInfo.length > 0) {
        console.log(`${ sentIntensitiesInfo.length } intensities were succesfully sent.`);
        dispatch(intensitiesSentToServer(sentIntensitiesInfo));
      }
    } else {
      dispatch(
        synchronizerError(
          'Quake intensities not sent because there are no stored intensities'));
    }
  }
};

async function sendQuakeReports(quakeReports, userToken) {
  const mapLocalQuakeIdToServerQuakeId = await getMapLocalQuakeIdToServerQuakeId();
  const alreadySentQuakes = await getSentQuakes();
  let sentQuakesInfo = [];
  const amountOfNotYetSentQuakes = 
    quakeReports.length - Object.keys(alreadySentQuakes).length;
  console.log(`Synchronizer trying to post quakes. ${ amountOfNotYetSentQuakes }`
    + ` out of ${ quakeReports.length } have not yet been sent.`);
  for (let quake of quakeReports) {
    // this id is different from the one we get from the server; hence `local`.
    const localQuakeId = quake.quakeId; 
    if (alreadySentQuakes.hasOwnProperty(localQuakeId)) {
      // the report has already been received by the server
      continue;
    }
    delete quake.quakeId; // server will reject otherwise
    try {
      serverQuakeId = await ServerAPI.postQuake(quake, userToken);
      // Report was succesfully sent.
      sentQuakesInfo.push({
        localQuakeId,
        serverQuakeId,
      });
      mapLocalQuakeIdToServerQuakeId[localQuakeId] = serverQuakeId;
      alreadySentQuakes[localQuakeId] = true; // `true` is just a dummy value.

      // We can now store our record of already sent quakes
      storeSentQuakes(alreadySentQuakes);
      // And our local-to-server id mapper.
      storeMapLocalQuakeIdToServerQuakeId(mapLocalQuakeIdToServerQuakeId);
    } catch (error) {
      console.log(`Couldn't send quake with id ${ localQuakeId }, 
        error: ${ JSON.stringify(error) }`);
    }
  }
  return sentQuakesInfo;
}

async function sendIntensities(intensities, userToken) {
  const mapLocalQuakeIdToServerQuakeId = await getMapLocalQuakeIdToServerQuakeId();
  const alreadySentIntensities = await getSentIntensities();
  let sentIntensitiesInfo = [];
  const amountOfNotYetSentIntensities = 
    intensities.length - Object.keys(alreadySentIntensities).length;
  console.log(`Synchronizer trying to post intensities. ${ amountOfNotYetSentIntensities }`
    + ` out of ${ intensities.length } have not yet been sent.`);
  for (let intensityObject of intensities) {
    const relatedQuakeLocalId = intensityObject.quakeId;
    if (alreadySentIntensities.hasOwnProperty(relatedQuakeLocalId)) {
      // the intensity has already been received by the server
      continue;
    }
    delete intensityObject.quakeId; // server will reject otherwise.
    const relatedQuakeServerId = mapLocalQuakeIdToServerQuakeId[relatedQuakeLocalId];
    try {
      const response = await ServerAPI.patchSurvey(intensityObject, relatedQuakeServerId, userToken);
      if (!response.ok) {
        throw response;
      }
      // Update was succesfully sent.
      sentIntensitiesInfo.push({
        localQuakeId: relatedQuakeLocalId,
        serverQuakeId: relatedQuakeServerId,
        intensity: intensityObject.intensity
      });
      alreadySentIntensities[relatedQuakeLocalId] = true;
      // And update the last sent intensity index in the storage.
      storeSentIntensities(alreadySentIntensities);
    } catch (error) {
      console.log(`Couldn't send intensity update for 
        quake with local id ${ relatedQuakeLocalId }, 
        server id ${ relatedQuakeServerId },
        error: ${ JSON.stringify(error) }`);
    }
  }
  return sentIntensitiesInfo;
}

/**
 * Returns an object that maps the local quake ids to the quake ids 
 * returned by the server.
 */
async function getMapLocalQuakeIdToServerQuakeId() {
  return _getMap(MAP_LOCAL_QUAKE_ID_TO_SERVER_QUAKE_ID);
}

async function getSentQuakes() {
  return _getMap(SENT_QUAKES_KEY);
}

async function getSentIntensities() {
  return _getMap(SENT_INTENSITIES_KEY);
}

async function _getMap(key) {
  try {
    const map = JSON.parse(await AsyncStorage.getItem(key));
    if (!map) {
      return {};
    }
    return map;
  } catch (error) {
    return {};
  }
}

async function storeSentIntensities(sentIntensities) {
  return AsyncStorage.setItem(SENT_INTENSITIES_KEY, JSON.stringify(sentIntensities));
}

async function storeSentQuakes(sentQuakes) {
  return AsyncStorage.setItem(SENT_QUAKES_KEY, JSON.stringify(sentQuakes));
}

async function storeMapLocalQuakeIdToServerQuakeId(newMap) {
  return AsyncStorage.setItem(MAP_LOCAL_QUAKE_ID_TO_SERVER_QUAKE_ID, JSON.stringify(newMap));
}
