require('dotenv').config({ path: '../.env' })
var KEY = process.env.BINGSEARCH_APIKEY;
var axios = require('axios')
var urls = []
var snippets = []
var Answers = []

async function getRequest(query) {

    var options = {
        method: 'GET',
        url: `https://api.bing.microsoft.com/v7.0/custom/search?q=${query}=&customconfig=bb7ab8d7-61a0-4f0b-9597-37a5b9475933&mkt=en-US`,
        headers: {
            'Ocp-Apim-Subscription-Key': `${KEY}`
        }
    }

    chunk = await axios.request(options)
        .catch((e) => {
            console.log(e);
        })
    return chunk.data.webPages.value;
}

async function getAnswer(query) {
    data = await getRequest(query);
    data.forEach(value => {
        urls.push(value.url)
        snippets.push(value.snippet)
    });

    for (i = 0; i < 3; i++) {

        Answers.push(
            {
                name: '\u200b',
                value: `URL: ${urls[i]} \n ${snippets[i]} \n`,
                inline: false

            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
        )
    }
    return Answers;
}

module.exports=getAnswer;