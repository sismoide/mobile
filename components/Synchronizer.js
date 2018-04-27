import { NetInfo, AsyncStorage } from 'react-native';
import ServerAPI from "../serverAPI/ServerAPI.js";
import Storage from "../database/storage.js";

const LAST_QUAKE_POS_KEY = '@QuakeReports:lastPos';
const LAST_SURVEY_POS_KEY = '@QuakeIntensities:lastPos';
const QUAKE_ID_TO_SERVER_ID = '@IDDictionary:all';

export default (function() {
  let connectionType = 'none';
  let lastQuakeSentPos = null;
  let lastSurveySentPos = null;
  let quakeToServerId = null;

  function setConnectionType(type) {
    connectionType = type;
  }

  async function getAsyncStorageData() {
    quakePos = await AsyncStorage.getItem(LAST_QUAKE_POS_KEY);
    surveyPos = await AsyncStorage.getItem(LAST_SURVEY_POS_KEY);
    ids = await AsyncStorage.getItem(QUAKE_ID_TO_SERVER_ID);
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
          serverId = await ServerAPI.postQuake(quakeToSend);
          quakeToServerId[qId] = serverId;
          console.log("ServerID: "+serverId);
          lastQuakeSentPos = i.toString();
          await AsyncStorage.setItem(
            LAST_QUAKE_POS_KEY,
            lastQuakeSentPos);
          await AsyncStorage.setItem(
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
      console.log('No intensities to send');
    } else {
      for (let i = 1+lastSurveySentPos; i<surveyList.length; i++) {
        try {
          let surveyToSend = surveyList[i];
          quakeId = surveyToSend.quakeId;
          delete surveyToSend.quakeId;
          serverId = quakeToServerId[quakeId];
          await ServerAPI.patchSurvey(surveyList[i], serverId);
          lastSurveySentPos = i.toString();
          await AsyncStorage.setItem(
            LAST_SURVEY_POS_KEY,
            lastSurveySentPos);
        }
        catch (error) {
          throw `Failed to send survey: ${ error }`;
        }
      }
    }
  }

  async function resetStorageVariables() {
    await AsyncStorage.removeItem(LAST_QUAKE_POS_KEY);
    await AsyncStorage.removeItem(LAST_SURVEY_POS_KEY);
    await AsyncStorage.removeItem(QUAKE_ID_TO_SERVER_ID);
  }

  async function checkConnectionAndSend() {
    if (connectionType != 'none') {
      console.log("Connection Type: "+connectionType);
      await sendQuakes();
      await sendSurveys();
    } else {
      throw 'Can\'t connect to server';
    }
  }

  return{
    connectionHandler: function(connectionInfo) {
      setConnectionType(connectionInfo.type);
      getAsyncStorageData()
      .then(() => {
        checkConnectionAndSend();
      })
      .then(() => {});
    },
    
    onDataChange: function() {
      checkConnectionAndSend()
	  .then(() => {});
    },
  }
})()