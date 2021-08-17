require('dotenv').config({ path: '../.env' })
const crypto = require('crypto')
var request = require('request');
const cf_apiKey = process.env.CF_APIKEY;
const cf_apiSecret = process.env.CF_APISECRET;


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


var dates = [];
var names = [];
let contFields = [];
let upcoming_contests = [];
const time = Math.round(new Date().getTime() / 1000);
const rand = randomNumber(100000, 999999);
const hash = crypto.createHash('sha512').update(`${rand}/contest.list?apiKey=${cf_apiKey}&time=${time}#${cf_apiSecret}`).digest('hex');
const cf_url = `https://codeforces.com/api/contest.list?apiKey=${cf_apiKey}&time=${time}&apiSig=${rand}${hash}`;


function getRequest() {
    return new Promise(function (resolve, reject) {
        request(cf_url, function (error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}


async function getContest() {

    var uc = await getRequest();
    let data = JSON.parse(uc);
    upcoming_contests = data['result'].filter((con) => {
        return con.phase = 'BEFORE';
    }).slice(1, 10);
    upcoming_contests.forEach((obj) => names.push(String(obj.name)))
    upcoming_contests.forEach((obj) => {
        var date = new Date(Number(obj.startTimeSeconds));
        date.toString("dd MM");
        dates.push(String(date))
    })

    cont = { names, dates }


    for (let i = 0; i < cont.names.length; i++) {
        contFields.push(
            {
                name: cont.names[i],
                value: cont.dates[i],
                inline: false

            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
        )
    }

    return contFields;
}

module.exports= getContest;

