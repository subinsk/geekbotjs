module.exports ={
  name:'ping',
  description: 'Ping message',
  async execute(bot, message, args,Discord){
    message.reply("\n Hey!")
  }
}