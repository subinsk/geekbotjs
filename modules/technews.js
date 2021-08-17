require('dotenv').config({ path: '../.env' })
const request = require('request');

let tech;
let techFields = [];
const news_url = `https://newsapi.org/v2/top-headlines?country=in&category=technology&from=2021-08-07&sortBy=popularity&apiKey=${process.env.NEWS_APIKEY}`;


function getRequest() {
    return new Promise(function (resolve, reject) {
        request(news_url, function (error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}

async function getNews() {
    var chunk = await getRequest();
    let data = JSON.parse(chunk);
    tech = data['articles'].slice(1, 3);

    for (let i = 0; i < tech.length; i++) {

        techFields.push(

            {
                name: tech[i].title,
                value: tech[i].description,
                image: {
                    url: tech[i].urlToImage,
                },
                inline: false
            },

            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
        )
    }
    return techFields;
}

module.exports= getNews;