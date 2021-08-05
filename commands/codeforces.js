require('dotenv').config({ path: '../.env' })
const crypto = require('crypto')
var request = require('request');
const cf_apiKey = process.env.CF_APIKEY;
const cf_apiSecret = process.env.CF_APISECRET;
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
let upcoming_contests = [];
const time = Math.round(new Date().getTime() / 1000);
const rand = randomNumber(100000, 999999);
const hash = crypto.createHash('sha512').update(`${rand}/contest.list?apiKey=${cf_apiKey}&time=${time}#${cf_apiSecret}`).digest('hex');
const cf_url = `https://codeforces.com/api/contest.list?apiKey=${cf_apiKey}&time=${time}&apiSig=${rand}${hash}`;

function getContest() {
    return new Promise(function (resolve, reject) {
        request(cf_url, function (error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}
var dates=[];
var names=[];
async function main() {
    var uc = await getContest();
    let data = JSON.parse(uc);
    upcoming_contests = data['result'].filter((con) => {
        return con.phase = 'BEFORE';
    });

    upcoming_contests
        .slice(1, 3)
        .forEach((obj) => names.push(obj.name))
    upcoming_contests
        .slice(1, 3)
        .forEach((obj) => {
            var date = new Date(Number(obj.startTimeSeconds));

            date.toString("hh mm ss dd MM yyyy");
            dates.push(date)
            
        }
        )
    // Object.keys(obj)
    //     .forEach(key=>{
    //             obj[key]
    //         })
    //     );
}
main();

// getContestNameAndURL();
module.exports = {
    name: 'codeforces contest',
    description: 'Gives details of upcoming contests ',
    async execute(bot, message, args, Discord) {
        console.log(String(upcoming_contests['name'].slice(1, 15).forEach((names) => names)))
        const contestsEmbed = await new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Codeforces Upcoming Contests')
            .setThumbnail('https://assets.codeforces.com/images/codeforces-sponsored-by-vk-en.PNG')
            .addField('Name of Contest',String(names.forEach((name)=>name)), true)
            .addField('Start time', dates.forEach(), true)
            .setImage('https://assets.codeforces.com/images/codeforces-sponsored-by-vk-en.PNG')
            .setTimestamp()
        channel.send({ embeds: [contestsEmbed] });
    }
}