async function getEmbed(Title,Field) {

    return (
        {
            color: 0x0099ff,
            title: Title,

            author: {
                name: 'Subin',
                icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                url: 'https://www.linkedin.com/in/subin-s-k-9b767219a/',
            },

            field: {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },

            fields: Field,

            field: {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },

            timestamp: new Date(),

            footer: {
                text: 'Developed By Subin',
                icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
            }
        }
    )
}

module.exports=getEmbed;