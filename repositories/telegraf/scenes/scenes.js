const {
  Telegraf,
  session,
  Scenes: { WizardScene, Stage },
} = require('telegraf');
const { axiosGet } = require('../../../http');

exports.createScene = (payload, bot) => {
  let message = '';
  const readyScene = [];

  const scheme = payload.map(({ type, values }) => {
    switch (type) {
      case 'MESSAGE_COMMAND':
        return Telegraf.command(`/${values.command}`, async ctx => {
          message = ctx.message.text;

          await ctx.reply(values.response);
          return ctx.wizard.next();
        });

      case 'API_BLOCK':
        const query = values.entrance;

        const response = async () => await axiosGet(query + message);

        console.log(response);

        return Telegraf.reply(response);
    }
  });

  const scene = new WizardScene(
    'testingScene',
    Telegraf.command(`/gay`, async ctx => {
      await ctx.reply('gay is alright');

      return ctx.wizard.next();
    }),
    Telegraf.on('text', async ctx => {
      console.log(ctx.message.chat.id, 'MESSAGE');
      message = ctx.message.text;

      return ctx.wizard.next();
    }),
    bot.telegram.sendMessage(ctx => ctx.message.chat.id, message),
  );
  scene.enter();

  const stage = new Stage([scene]);
  stage.hears('exit', ctx => ctx.scene.leave());

  bot.use(session(), stage.middleware());

  bot.use(
    bot.start(ctx => {
      ctx.scene.enter('testingScene');
      ctx.reply('I dunno');
    }),
  );
};
