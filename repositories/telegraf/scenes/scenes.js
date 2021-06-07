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

  scheme = payload.map(({ type }) => {
    switch (type) {
      case 'START_COMMAND':
        console.log('it went here');
        return Telegraf.command('/start', ctx => ctx.reply("it's started"));

      case 'MESSAGE_COMMAND':
        return Telegraf.command(payload.command, async ctx => {
          message = ctx.message.text;

          return ctx.wizard.next();
        });

      case 'API_BLOCK':
        console.log('it went here2');
        const query = payload.entrance;

        const response = async () => await axiosGet(query + message);

        return Telegraf.reply(response, async ctx => {
          return ctx.scene.leave();
        });
    }
  });

  const scene = new WizardScene(
    sceneName,
    Telegraf.command('/start', ctx => ctx.reply("it's started")),
  );
  scene.enter(ctx => ctx.reply('hey'));
  const stage = new Stage([scene]);
  stage.hears('exit', ctx => ctx.scene.leave());

  bot.use(stage.hears('exit', ctx => ctx.scene.leave()));

  bot.use(session());
  bot.use(stage.middleware());
  bot.use(
    bot.on('text', ctx => {
      ctx.scene.enter(sceneName);
    }),
  );

  console.log(payload, 'Is it working ?');
};
