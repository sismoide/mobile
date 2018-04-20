import { NetInfo, AsyncStorage } from 'react-native';
import ServerAPI from "../serverAPI/ServerAPI.js";
import Storage from "../database/Storage.js";

const LAST_QUAKE_KEY = 'lastQuakeSent';
const LAST_SURVEY_KEY = 'lastSurveySent';

var Sync = (async function() {
	var connectionType = 'none';
	var lastQuakeSent = await AsyncStorage.getItem(LAST_QUAKE_KEY);
	var lastSurveySent = await AsyncStorage.getItem(LAST_SURVEY_KEY);
	
	function changeConnectionType(type) {
		connectionType = type;
	}
	
	async function sendQuakes() {
		var quakeList = await Storage.getQuakeReports();
		if (quakeList && connectionType != 'none') {
			if (lastQuakeSent) {
				const lastSentIndex = quakeList.lastIndexOf(lastQuakeSent);
				quakeList = quakeList.slice(lastSentIndex+1);
			}
			if (quakeList != []) {
				quakeList.map( function(report) {
					try {
						ServerAPI.postQuake(report);
						lastQuakeSent = report;
						await AsyncStorage.setItem(
							LAST_QUAKE_KEY,
							JSON.stringify(report));
					}
					catch (error) { throw 'Failed to send quake' }
				});
			}
		} else if (!quakeList) {
			console.log('Failed to send quake report: No reports?');
		} else {
			throw('Failed to send quake report: No connection');
		}
	}
	
	async function sendSurveys() {
		var surveyList = await Storage.getIntensities();
		if (surveyList && connectionType != 'none') {
			if (lastSurveySent) {
				const lastSentIndex = surveyList.lastIndexOf(lastSurveySent);
				surveyList = surveyList.slice(lastSentIndex+1);
			}
			if (surveyList != []) {
				surveyList.map( function(intensity) {
					try {
						ServerAPI.patchSurvey(intensity);
						lastSurveySent = intensity;
						await AsyncStorage.setItem(
							LAST_SURVEY_KEY,
							JSON.stringify(intensity));
					}
					catch (error) { throw 'Failed to send survey' }
				});
			}
		} else if (!surveyList) {
			console.log('Failed to send intensities: No intensities');
		} else {
			throw('Failed to send intensities: No connection');
		}
	}
	
	return{
		connectionHandler: async function(connectionInfo) {
			changeConnectionType(connectionInfo.type);
			if (connectionType != 'none') {
				await onDataChange();
			}
		},
		
		onDataChange: async function() {
			await sendQuakes();
			await sendSurveys();
		},
	}
})()

export default Sync;