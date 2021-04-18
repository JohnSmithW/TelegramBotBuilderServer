const { Telegraf } = require('telegraf');

exports.createBot = async (req, res) => {
  const token = res.token;
  if (token) {
    const bot = new Telegraf(token);
    bot.start(ctx => ctx.reply('Welcome'));
    bot.help(ctx => ctx.reply('Send me a sticker'));
    bot.on('sticker', ctx => ctx.reply('👍'));
    bot.hears('hi', ctx => ctx.reply('Hey there'));
    bot.hears('wow', ctx => ctx.reply('I know'));
    bot.launch();

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  }

  res.send({ok:true})
};
