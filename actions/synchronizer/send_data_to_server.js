import { AsyncStorage } from 'react-native';

import attemptingToSendData from './attempting_to_send_data.js';
import synchronizerError from './synchronizer_error.js';
import quakeReportsSent from './quake_reports_sent.js';
import intensitiesSentToServer from './intensities_sent_to_server.js';

import Storage from '../../database/storage.js';
import ServerAPI from '../../serverAPI/ServerAPI.js';

const LAST_QUAKE_SENT_INDEX = '@QuakeReports:lastSentIndex';
const LAST_INTENSITY_SENT_INDEX = '@QuakeReports:lastIntensitySentIndex';
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
    if (allQuakeReports) {
      const sentQuakesInfo = await sendQuakeReports(allQuakeReports, userToken);
      if (sentQuakesInfo.length > 0) {
        dispatch(quakeReportsSent(sentQuakesInfo));
      }
    } else {
      dispatch(
        synchronizerError(
          'Quake reports not sent because there are no stored quake reports'));
    }

    const allIntensities = await Storage.getIntensities();
    if (allIntensities) {
      const sentIntensitiesInfo = await sendIntensities(allIntensities, userToken);
      if (sentIntensitiesInfo.length > 0) {
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
  const lastSentQuakeIndex = await getLastSentQuakeIndex();
  const mapLocalQuakeIdToServerQuakeId = await getMapLocalQuakeIdToServerQuakeId();
  let sentQuakesInfo = [];
  for (
    let quakeIndex = lastSentQuakeIndex + 1; 
    quakeIndex < quakeReports.length;
    ++quakeIndex) {
    const quake = quakeReports[quakeIndex];
    // this id is different from the one we get from the server; hence `local`.
    const localQuakeId = quake.quakeId; 
    delete quake.quakeId; // server will reject otherwise
    try {
      serverQuakeId = await ServerAPI.postQuake(quake, userToken);
      // Report was succesfully sent.
      sentQuakesInfo.push({
        localQuakeId,
        serverQuakeId,
      });
      mapLocalQuakeIdToServerQuakeId[localQuakeId] = serverQuakeId;

      // We can now update our last report index.
      storeLastSentQuakeIndex(quakeIndex);
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
  const lastSentIntensityIndex = await getLastSentIntensityIndex();
  const mapLocalQuakeIdToServerQuakeId = await getMapLocalQuakeIdToServerQuakeId();
  let sentIntensitiesInfo = [];
  for (
    let intensityIndex = lastSentIntensityIndex + 1;
    intensityIndex < intensities.length;
    ++intensityIndex) {
    const intensityObject = intensities[intensityIndex];
    const relatedQuakeLocalId = intensityObject.quakeId;
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
      // And update the last sent intensity index in the storage.
      storeLastSentIntensityIndex(intensityIndex);
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
  try {
    const map = JSON.parse(
      await AsyncStorage.getItem(MAP_LOCAL_QUAKE_ID_TO_SERVER_QUAKE_ID));
    if (!map) {
      return {};
    }
    return map;
  } catch (error) {
    return {};
  }
}


async function storeLastSentQuakeIndex(index) {
  return AsyncStorage.setItem(LAST_QUAKE_SENT_INDEX, index.toString());
}

async function storeLastSentIntensityIndex(index) {
  return AsyncStorage.setItem(LAST_INTENSITY_SENT_INDEX, index.toString());
}

async function storeMapLocalQuakeIdToServerQuakeId(newMap) {
  return AsyncStorage.setItem(
    MAP_LOCAL_QUAKE_ID_TO_SERVER_QUAKE_ID, 
    JSON.stringify(newMap));
}


/**
 * Returns the last sent quake index wr to the quake reports
 * list stored at @QuakeReports:all.
 * Returns -1 if no quake has ever been sent.
 */
async function getLastSentQuakeIndex() {
  return getIndexFromStorage(LAST_QUAKE_SENT_INDEX);
}

/**
 * Returns the last sent intensity index wr to the intensity submissions
 * list stored at @QuakeIntensities:all.
 * Returns -1 if no quake has ever been sent.
 */
async function getLastSentIntensityIndex() {
  return getIndexFromStorage(LAST_INTENSITY_SENT_INDEX);
}

async function getIndexFromStorage(key) {
  try {
    storedIndex = await AsyncStorage.getItem(key);
    if (storedIndex !== null) {
      return parseInt(storedIndex);
    }
    return -1;
  } catch (err) {
    return -1;
  }
}
