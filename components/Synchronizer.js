import { NetInfo, AsyncStorage } from 'react-native';
import ServerAPI from "../serverAPI/ServerAPI.js";
import Storage from "../database/Storage.js";

const LAST_QUAKE_KEY = '@QuakeReports:last';
const LAST_SURVEY_KEY = '@QuakeIntensities:last';

var Sync = (function() {
	var fst = true;
	var connectionType = 'none';
	var lastQuakeSent = null;
	var lastSurveySent = null;
	
	async function changeConnectionType(type) {
		lastQuakeSent = JSON.parse(await AsyncStorage.getItem(LAST_QUAKE_KEY));
		lastSurveySent = JSON.parse(await AsyncStorage.getItem(LAST_SURVEY_KEY));
		connectionType = type;
	}
	
	function sendQuakes() {
		Storage.getQuakeReports().then(async (quakeList) => {
			if (quakeList && quakeList != [] && connectionType != 'none') {
				let toSend = 0;
				const nQuakes = quakeList.length;
				if (lastQuakeSent) {
					for (var i = nQuakes-1; i >=0; i--) {
						if (JSON.stringify(quakeList[i]) ==
						    JSON.stringify(lastQuakeSent)) {
							break;
						} else { toSend++; }
					}
				} else {
					toSend++;
				}
				for (var i = nQuakes-toSend; i<nQuakes; i++) {
					try {
						ServerAPI.postQuake(quakeList[i]);
						lastQuakeSent = quakeList[i];
						await AsyncStorage.setItem(
							LAST_QUAKE_KEY,
							JSON.stringify(lastQuakeSent));
					}
					catch (error) {
						throw 'Failed to send quake';
					}
				}
			} else if (!quakeList || quakeList == []) {
				console.log('Failed to send quake report: No reports?');
			} else {
				throw('Failed to send quake report: No connection');
			}
		}).catch(()=>{});
	}
	
	function sendSurveys() {
		Storage.getIntensities().then(async (surveyList) => {
			if (surveyList && surveyList != [] && connectionType != 'none') {
				let toSend = 0;
				const nSurveys = surveyList.length;
				if (lastSurveySent) {
					for (var i = nSurveys-1; i >=0; i--) {
						if (JSON.stringify(surveyList[i]) ==
						    JSON.stringify(lastSurveySent)) {
							break;
						} else { toSend++; }
					}
				} else {
					toSend++;
				}
				for (var i = nSurveys-toSend; i<nSurveys; i++) {
					try {
						ServerAPI.patchSurvey(surveyList[i]);
						lastSurveySent = surveyList[i];
						await AsyncStorage.setItem(
							LAST_SURVEY_KEY,
							JSON.stringify(lastSurveySent));
					}
					catch (error) {
						throw 'Failed to send quake';
					}
				}
			} else if (!surveyList || surveyList == []) {
				console.log('No intensities to send');
			} else {
				throw('Failed to send intensities: No connection');
			}
		}).catch(()=>{});
	}
	
	return{
		connectionHandler: function(connectionInfo) {
			changeConnectionType(connectionInfo.type).then(() => {
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

export default Sync;