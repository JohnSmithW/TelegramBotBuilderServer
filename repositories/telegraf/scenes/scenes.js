const {
  Telegraf,
  session,
  Scenes: { WizardScene, Stage },
} = require('telegraf');
const { axiosGet } = require('../../../http');

exports.createScene = (payload, bot) => {
  const sceneName = `scene`;
  let scheme = [];
  const message = '';
  const readyScene = [];

  scheme = payload.map(({ type, values }) => {
    switch (type) {
      case 'START_COMMAND':
        return Telegraf.command('/start', ctx => ctx.reply(values.response));

      case 'MESSAGE_COMMAND':
        console.log('it went here');
        return Telegraf.command(`/${values.command}`, async ctx => {
          message = ctx.message.text;

          await ctx.reply(values.response);
          return ctx.wizard.next();
        });

      case 'API_BLOCK':
        console.log('it went here2');
        const query = values.entrance;

        const response = async () => await axiosGet(query + message);

        console.log(response);

        return Telegraf.reply(response);
    }
  });

  const scene = new WizardScene(sceneName, scheme);
  scene.enter();

  const stage = new Stage([scene]);
  stage.hears('exit', ctx => ctx.scene.leave());

  bot.use(
    stage.hears('exit', ctx => ctx.scene.leave()),
    session(),
    stage.middleware(),
    bot.start(ctx => {
      ctx.scene.enter(sceneName);
      ctx.reply('I dunno');
    }),
  );
};
