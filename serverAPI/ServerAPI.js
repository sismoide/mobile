import Config from '../config/index.js';
import moment from 'moment-timezone';

const sha256 = require('js-sha256');

function _headersForAuthToken(authToken) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${ authToken }`
  };
}

function _withNumericCoordinates(object) {
  return {
    ...object,
    coordinates: {
      latitude: Number(object.coordinates.latitude),
      longitude: Number(object.coordinates.longitude),
    }
  }
}

async function _fetchNearbySomething(userToken, userLocation, baseUrl) {
  const squareSize = 2;
  const minLat = userLocation.latitude - squareSize;
  const maxLat = userLocation.latitude + squareSize;
  const minLong = userLocation.longitude - squareSize;
  const maxLong = userLocation.longitude + squareSize;
  const queryString = 
    `?min_lat=${ minLat }&max_lat=${ maxLat }&min_long=${ minLong }&max_long=${ maxLong }`;
  const fullUrl = `${ baseUrl }${ queryString }`;
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: _headersForAuthToken(userToken)
  });
  if (!response.ok) {
    throw response;
  }
  return await response.json();
}

export default {
  nonceRequest: async function() {
    const nonce = {
      method: 'POST'
    }
    let response = await fetch(Config.SERVER_URL_NONCE, nonce);
    if (!response.ok) {
      throw response;
    }
    let responseJson = await response.json();
    keySha = { 'h': sha256(responseJson.key) };
    return { key: responseJson.key, shaObj: keySha };
  },

  challengeRequest: async function(key, shaObj) {
    const challenge = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ''+key,
      },
      body: JSON.stringify(shaObj)
    }
    let response = await fetch(Config.SERVER_URL_CHALLENGE, challenge);
    if (!response.ok) {
      throw response;
    }
    let responseJson = await response.json();
    return responseJson.token;
  },

  fetchNearbyLandmarks: async function(userToken, userLocation) {
    const nearbyLandmarks = await _fetchNearbySomething(
      userToken, userLocation, Config.SERVER_URL_LANDMARKS);
    return nearbyLandmarks.map(_withNumericCoordinates);
  },

  fetchNearbyQuakes: async function(userToken, userLocation) {
    const nearbyQuakes = await _fetchNearbySomething(
      userToken, userLocation, Config.SERVER_URL_QUAKES);
    return nearbyQuakes.map(_withNumericCoordinates);
  },

  fetchNearbyReports: async function(userToken, userLocation) {
    const serverSideDateFormat = 'YYYY-MM-DDThh:mm';
    const yesterday = 
      moment().tz(Config.LOCALE).add(-12, 'hours').format(serverSideDateFormat);
    const rightNow = moment().tz(Config.LOCALE).format(serverSideDateFormat);
    const queryString = `?latitude=${ userLocation.latitude }`
      + `&longitude=${ userLocation.longitude }`
      + `&rad=${ 5 }`
      + `&start=${ yesterday }`
      + `&end=${ rightNow }`;
    const fullUrl = `${ Config.SERVER_URL_NEARBY_REPORTS }${ queryString }`;
    console.log(fullUrl);
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: _headersForAuthToken(userToken)
    });
    if (!response.ok) {
      throw response;
    }
    const nearbyReports = await response.json();
    return nearbyReports.map(_withNumericCoordinates);
  },

  postQuake: async function(body, userToken) {
    const quake = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+userToken
      },
      body: JSON.stringify(body)
    };
    let response = await fetch(Config.SERVER_URL_REPORTS, quake);
    if (!response.ok) {
      throw response;
    }
    let responseJson = await response.json();
    return responseJson.id;
  },
  
  patchSurvey: async function(body, id, userToken) {
    const survey = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+userToken
      },
      body: JSON.stringify(body)
    };
    patchUrl = Config.SERVER_URL_REPORTS + id + '/';
    return fetch(patchUrl, survey);
  },
}
