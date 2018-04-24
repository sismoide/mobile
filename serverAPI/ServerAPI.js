import Config from '../config/index.js';

export default {
  postQuake: async function(body) {
    const quake = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    };
    console.log(quake);
    let response = await fetch(Config.SERVER_URL, quake);
	let responseJson = await response.json();
//	console.log(responseJson);
	return responseJson.id;
  },
  
  patchSurvey: function(body, id) {
//  patchSurvey: function(body) {
    const survey = {
      method: 'PATCH',
	  headers: {
        'Content-Type': 'application/json',
	  },
      body: JSON.stringify(body)
    };
	patchUrl = Config.SERVER_URL+id+'/';
    console.log(patchUrl);
	console.log(survey);
    fetch(patchUrl, survey)
	  .then(() => {});
  },
  
  setAccount: function() {},
  
  getAccountID: function() {}
}