var axios = require("axios").default;
require('dotenv').config({ path: '../.env' })

var options = {
  method: 'GET',
  url: 'https://quotes15.p.rapidapi.com/quotes/random/',
  params: {language_code: 'en'},
  headers: {
    'x-rapidapi-key': process.env.RAPID_APIKEY,
    'x-rapidapi-host': 'quotes15.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data.content);
	console.log(response.data.originator.name);
}).catch(function (error) {
	console.error(error);
});