const { Telegraf } = require('telegraf');

const buildScheme = (token, data) => {
  const bot = new Telegraf(token);
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
  console.log(scheme);
  // const bot = new Telegraf(token);

  if (token) {
    // bot.start(ctx => ctx.reply('Welcome'));
    // bot.help(ctx => ctx.reply('Send me a sticker'));
    // bot.on('sticker', ctx => ctx.reply('👍'));
    // bot.hears('hi', ctx => ctx.reply('Hey there'));
    // bot.hears('wow', ctx => ctx.reply('I know'));
    // bot.launch();

    // process.once('SIGINT', () => bot.stop('SIGINT'));
    // process.once('SIGTERM', () => bot.stop('SIGTERM'));

    buildScheme(token, scheme);

    // console.log(buildScheme(token, scheme));
  }

  res.send({ ok: true });
};
