module.exports={
    name:'image',
    description:'This sends a image on based on query',
    async execute(bot,message, args){
        const image_query = args.join(' ');
        var Scrapper = require('images-scraper');
        if(!image_query) return message.channel.send('Please enter an image name');
        const google = new Scrapper({
            puppeteer:{
                headless: false,
            },
        });

        const image_results = await google.scrape(image_query,1);

        message.channel.send(image_results[0].url);

    }
}