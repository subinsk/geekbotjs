var axios = require("axios").default;
require('dotenv').config({ path: '../.env' })

var holidays = [];
year = new Date().getFullYear();
month = new Date().getMonth() + 1;
day = new Date().getDay();

var options = {
    method: 'GET',
    url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDER_APIKEY}&country=IN&month=${month}&year=${year}`
};

async function getHolidays() {
    try{
        response = await axios.request(options)
        for (i = 0; i < response.holidays.length; i++) {
            if (response.data.holidays[i].datetime.day == day) {
                holidays.push(response.data.holidays[i].name);
            }
        }
        if(holidays){
            return holidays;
        }
    }
    catch(e){
        console.log(e);
    }

}
(async () => {
})();

module.exports = getHolidays;
