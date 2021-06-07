const { Telegraf } = require('telegraf');
const { createScene } = require('../repositories/telegraf/scenes/scenes');

let bot = null;

const buildScheme = (bot, data) => {
  // const bot = new Telegraf(token);

  let scheme = [];

  scheme = data.map(action => {
    let message = '';
    let event = '';
    switch (action.type) {
      case 'START':
        message = action.payload.message;

        return bot.start(ctx => ctx.reply(message));

      case 'HELP':
        message = action.payload.message;

        return bot.start(ctx => ctx.reply(message));

      case 'ON':
        event = action.payload.event;
        message = action.payload.message;

        return bot.on(event, ctx => ctx.reply(message));

      case 'HEARS':
        event = action.payload.event;
        message = action.payload.message;

        return bot.hears(event, ctx => ctx.reply(message));

      default:
        return;
    }
  });

  scheme.push(
    bot.launch(),
    process.once('SIGINT', () => bot.stop('SIGINT')),
    process.once('SIGTERM', () => bot.stop('SIGTERM')),
  );

  return scheme;
};

exports.createBot = async (req, res) => {
  const { token, scheme } = req.body;

  bot = new Telegraf('1789798446:AAEWI5CjfOLGeGMxpaVBqunx1WhS0TRcVS8');

  bot.launch();
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  if (token) {
    buildScheme(bot, scheme);

    // console.log(buildScheme(token, scheme));
  }

  res.send({ ok: true });
};

exports.saveBot = async (req, res) => {
  const data = req.body;
  bot = new Telegraf('1789798446:AAEWI5CjfOLGeGMxpaVBqunx1WhS0TRcVS8');

  createScene(data, bot);
  bot.launch();
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  res.send({ ok: true, message: 'it worked' });
};
