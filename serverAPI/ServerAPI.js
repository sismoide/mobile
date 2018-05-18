import Config from '../config/index.js';

var sha256 = require('js-sha256');

export default {
  nonceRequest: async function() {
    const nonce = {
      method: 'POST'
    }
    console.log(Config.SERVER_URL_NONCE);
    let response = await fetch(Config.SERVER_URL_NONCE, nonce);
    let responseJson = await response.json();
    keySha = { 'h': sha256(responseJson.key) };
    return challengeRequest(responseJson.key, keySha);
  },

  challengeRequest: async function(key, shaObj) {
    const challenge = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authotization': ''+key,
      },
      body: JSON.stringify(shaObj)
    }
    let response = await fetch(Config.SERVER_URL_CHALLENGE, challenge);
	let responseJson = await response.json();
	return responseJson.token;
  },

  postQuake: async function(body) {
    const quake = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
//		'Authotization': 'Token []'
      },
      body: JSON.stringify(body)
    };
    let response = await fetch(Config.SERVER_URL_REPORTS, quake);
    let responseJson = await response.json();
    return responseJson.id;
  },
  
  patchSurvey: async function(body, id) {
    const survey = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
		'Authotization': 'Token []'
      },
      body: JSON.stringify(body)
    };
    patchUrl = Config.SERVER_URL_REPORTS + id + '/';
    fetch(patchUrl, survey);
  },
}
