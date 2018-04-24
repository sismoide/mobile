import { NetInfo, AsyncStorage } from 'react-native';
import ServerAPI from "../serverAPI/ServerAPI.js";
import Storage from "../database/Storage.js";

const LAST_QUAKE_POS_KEY = '@QuakeReports:lastPos';
const LAST_SURVEY_POS_KEY = '@QuakeIntensities:lastPos';
const ID_DICTIONARY = '@IDDictionary:all';

export default (function() {
  let connectionType = 'none';
  let lastQuakeSentPos = null;
  let lastSurveySentPos = null;
  let idDict = null;
  
  async function setVars(type) {
    connectionType = type;
	AsyncStorage.removeItem(LAST_QUAKE_POS_KEY);
	AsyncStorage.removeItem(LAST_SURVEY_POS_KEY);
	AsyncStorage.removeItem(ID_DICTIONARY);
    quakePos = await AsyncStorage.getItem(LAST_QUAKE_POS_KEY);
    surveyPos = await AsyncStorage.getItem(LAST_SURVEY_POS_KEY);
	ids = await AsyncStorage.getItem(ID_DICTIONARY);
    lastQuakeSentPos = quakePos ? parseInt(quakePos) : -1;
    lastSurveySentPos = surveyPos ? parseInt(surveyPos) : -1;
	idDict = (ids ? JSON.parse(ids) : {});	
  }
	
  function sendQuakes() {
    Storage.getQuakeReports().then(async (quakeList) => {
      if (quakeList && quakeList != [] && connectionType != 'none') {
        const nQuakes = quakeList.length;
        for (let i = 1+lastQuakeSentPos; i<nQuakes; i++) {
          try {
			let quakeToSend = quakeList[i];
			qId = quakeToSend.quakeId;
			delete quakeToSend.quakeId;
			serverId = await ServerAPI.postQuake(quakeToSend);
			idDict[qId] = serverId;
			console.log("ServerID: "+serverId);
			lastQuakeSentPos = i.toString();
            await AsyncStorage.setItem(
              LAST_QUAKE_POS_KEY,
              lastQuakeSentPos);
			await AsyncStorage.setItem(
			  ID_DICTIONARY,
			  idDict.toString());
          }
          catch (error) {
            throw `Failed to send quake: ${ error }`;
          }
        }
      } else if (!quakeList || quakeList == []) {
        console.log('Failed to send quake report: No reports?');
      } else {
        /* throw('Failed to send quake report: No connection'); */
      }
    });
  }
  
  function sendSurveys() {
    Storage.getIntensities().then(async (surveyList) => {
      if (surveyList && surveyList != [] && connectionType != 'none') {
        const nSurveys = surveyList.length;
        for (let i = 1+lastSurveySentPos; i<nSurveys; i++) {
          try {
			let surveyToSend = surveyList[i];
			quakeId = surveyToSend.quakeId;
			delete surveyToSend.quakeId;
			serverId = idDict[quakeId];
			ServerAPI.patchSurvey(surveyList[i], serverId);
            lastSurveySentPos = i.toString();
            await AsyncStorage.setItem(
              LAST_SURVEY_POS_KEY,
              lastSurveySentPos);
          }
          catch (error) {
            throw `Failed to send survey: ${ error }`;
          }
        }
      } else if (!surveyList || surveyList == []) {
//        console.log('No intensities to send');
      } else {
        /* throw('Failed to send intensities: No connection');*/
      }
    });
  }
  
  return{
    connectionHandler: function(connectionInfo) {
      setVars(connectionInfo.type).then(() => {
        if (connectionType != 'none') {
          onDataChange();
        }
      }).catch(() => {});
    },
    
    onDataChange: function() {
      console.log("Connection Type: "+connectionType);
      sendQuakes();
      sendSurveys();
    },
  }
})()