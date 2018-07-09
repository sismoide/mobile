import Config from '../config/index.js';

const sha256 = require('js-sha256');


function _headersForAuthToken(authToken) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Token ${ authToken }`
  };
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
    const squareSize = 0.1;
    const minLat = userLocation.latitude - squareSize;
    const maxLat = userLocation.latitude + squareSize;
    const minLong = userLocation.longitude - squareSize;
    const maxLong = userLocation.longitude + squareSize;
    const queryString = 
      `?min_lat=${ minLat }&max_lat=${ maxLat }&min_long=${ minLong }&max_long=${ maxLong }`;
    const fullUrl = `${ Config.SERVER_URL_LANDMARKS }${ queryString }`;
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: _headersForAuthToken(userToken)
    });
    if (!response.ok) {
      throw response;
    }
    const nearbyLandmarks = await response.json();
    return nearbyLandmarks.map(landmark => ({ 
      ...landmark,
      coordinates: {
        latitude: Number(landmark.coordinates.latitude),
        longitude: Number(landmark.coordinates.longitude),
      }
    }));
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
