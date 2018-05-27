import { NetInfo, AsyncStorage } from 'react-native';
import ServerAPI from "../serverAPI/ServerAPI.js";
import Storage from "../database/storage.js";

const LAST_QUAKE_POS_KEY = '@QuakeReports:lastPos';
const LAST_SURVEY_POS_KEY = '@QuakeIntensities:lastPos';
const QUAKE_ID_TO_SERVER_ID = '@IDDictionary:all';
const USER_TOKEN = '@UserToken';

export default (function() {
  let connectionType = 'none';
  let lastQuakeSentPos = null;
  let lastSurveySentPos = null;
  let quakeToServerId = null;
  let userToken = null;

  function setConnectionType(type) {
    connectionType = type;
  }

  async function getStorageData() {
    quakePos = await Storage.getStorageItem(LAST_QUAKE_POS_KEY);
    surveyPos = await Storage.getStorageItem(LAST_SURVEY_POS_KEY);
    ids = await Storage.getStorageItem(QUAKE_ID_TO_SERVER_ID);
    userToken = await Storage.getStorageItem(USER_TOKEN);

    lastQuakeSentPos = quakePos ? parseInt(quakePos) : -1;
    lastSurveySentPos = surveyPos ? parseInt(surveyPos) : -1;
    quakeToServerId = (ids ? JSON.parse(ids) : {});
  }

  async function sendQuakes() {
    quakeList = await Storage.getQuakeReports();
    if (!quakeList || quakeList == []) { 
      console.log('Failed to send quake report: No reports?');
    } else {
      for (let i = 1+lastQuakeSentPos; i<quakeList.length; i++) {
        try {
          let quakeToSend = quakeList[i];
          qId = quakeToSend.quakeId;
          delete quakeToSend.quakeId;
          serverId = await ServerAPI.postQuake(quakeToSend, userToken);
          quakeToServerId[qId] = serverId;
          lastQuakeSentPos = i.toString();
          await Storage.setStorageItem(
            LAST_QUAKE_POS_KEY,
            lastQuakeSentPos);
          await Storage.setStorageItem(
            QUAKE_ID_TO_SERVER_ID,
            JSON.stringify(quakeToServerId));
        }
        catch (error) {
          throw `Failed to send quake: ${ error }`;
        }
      }
    }
  }

  async function sendSurveys() {
    surveyList = await Storage.getIntensities();
    if (!surveyList || surveyList == []) {
      return;
    } 
    for (let i = 1+lastSurveySentPos; i<surveyList.length; i++) {
      try {
        let surveyToSend = surveyList[i];
        quakeId = surveyToSend.quakeId;
        delete surveyToSend.quakeId;
        serverId = quakeToServerId[quakeId];
        await ServerAPI.patchSurvey(surveyList[i], serverId, userToken);
        lastSurveySentPos = i.toString();
        await Storage.setStorageItem(
          LAST_SURVEY_POS_KEY,
          lastSurveySentPos);
      }
      catch (error) {
        throw `Failed to send survey: ${ error }`;
      }
    }
  }

  async function resetStorageVariables() {
    await Storage.removeStorageItem(LAST_QUAKE_POS_KEY);
    await Storage.removeStorageItem(LAST_SURVEY_POS_KEY);
    await Storage.removeStorageItem(QUAKE_ID_TO_SERVER_ID);
    await Storage.removeStorageItem(USER_TOKEN);
  }

  async function checkConnectionAndSend() {
    if (connectionType != 'none') {
      if (!userToken) {
        nonce = await ServerAPI.nonceRequest();
        userToken = await ServerAPI.challengeRequest(nonce.key, nonce.shaObj);
        Storage.setStorageItem(USER_TOKEN, userToken);
      }
      await sendQuakes();
      await sendSurveys();
    } else {
      throw 'Can\'t connect to server';
    }
  }

  return {
    connectionHandler: async function(connectionInfo) {
      setConnectionType(connectionInfo.type);
      try {
        await getAsyncStorageData();
        await checkConnectionAndSend();
      } catch (error) {
        // TODO:
      }
    },
    
    onDataChange: async function() {
      try {
        await checkConnectionAndSend();
      } catch (error) {
        // TODO:
      }
    },
  }
})()
