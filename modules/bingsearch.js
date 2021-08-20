require('dotenv').config({ path : '../.env'})
var axios = require("axios").default;

const BINGSEARCH_APIKEY = process.env.BINGSEARCH_APIKEY

if (!BINGSEARCH_APIKEY) {
  throw new Error('BINGSEARCH_APIKEY is not set.')
}

var query='hello'
var options={
    method: 'POST',
    url: `api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`,
    headers:  { 'Ocp-Apim-Subscription-Key': BINGSEARCH_APIKEY },
}

axios.request(options)
    .then((response)=>{
        console.log(response)
    })
    .catch((e)=>{
        console.log(e);
    })


// function bingWebSearch(query) {
//     https.get({
//       hostname: 'api.bing.microsoft.com',
//       path:     '/v7.0/search?q=' + encodeURIComponent(query),
//       headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
//     }, res => {
//       let body = ''
//       res.on('data', part => body += part)
//       res.on('end', () => {
//         for (var header in res.headers) {
//           if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
//             console.log(header + ": " + res.headers[header])
//           }
//         }
//         console.log('\nJSON Response:\n')
//         console.dir(JSON.parse(body), { colors: false, depth: null })
//       })
//       res.on('error', e => {
//         console.log('Error: ' + e.message)
//         throw e
//       })
//     })
//   }