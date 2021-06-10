const {
  Telegraf,
  session,
  Scenes: { WizardScene, Stage },
} = require('telegraf');
const { axiosGet } = require('../../../http');
const {
  extractScenesFromArray,
} = require('../../../utils/bot/extractScenesFromArray');
const { getStartCommand } = require('../../../utils/bot/getStartCommand');

exports.createScene = (payload, bot) => {
  let message = '';
  let scheme = [];
  const readyScene = [];

  payload.forEach(({ type, values }) => {
    switch (type) {
      case 'MESSAGE_COMMAND':
        scheme.push(
          Telegraf.command(`/${values.command}`, async ctx => {
            await ctx.reply(values.response);
            return ctx.wizard.next();
          }),
        );

        break;

      case 'API_BLOCK':
        const query = values.entrance;

        const response = async () => await axiosGet(query + message);

        console.log(response);

        scheme.push(Telegraf.reply(response));
        break;
    }
  });

  const handlerOne = Telegraf.command(`/test`, async ctx => {
    await ctx.reply('it works huh ?');
    return ctx.wizard.next();
  });

  // console.log(extractScenesFromArray(scheme));
  const scene = new WizardScene('testingScene', ...[scheme]);
  scene.enter();

  const stage = new Stage([scene]);
  stage.hears('exit', ctx => ctx.scene.leave());

  bot.use(session(), stage.middleware());

  bot.use(
    bot.start(ctx => {
      ctx.scene.enter('testingScene');

      ctx.reply(getStartCommand(payload));
    }),
  );
};
