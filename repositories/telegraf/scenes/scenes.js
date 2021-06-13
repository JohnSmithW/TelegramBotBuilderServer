const {
  Telegraf,
  session,
  Scenes: { WizardScene, Stage },
} = require('telegraf');
const { axiosGet } = require('../../../http');
const { getStartCommand } = require('../../../utils/bot/getStartCommand');
const JsonFind = require('json-find');
const { createKeyboard, createInlineKeyboard } = require('../keyboards');

exports.createScene = (payload, bot) => {
  let scheme = [];
  let keyboard = null;

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
        const key = values.key;

        scheme.push(
          Telegraf.on('text', async ctx => {
            const response = await axiosGet(query + ctx.message.text);

            const jsonData = JsonFind(response.data);
            console.log(jsonData.checkKey('url'));

            await ctx.reply(JSON.stringify(response.data.data[0].url));

            return ctx.wizard.next();
          }),
        );
        break;

      case 'KEYBOARD':
        keyboard = createKeyboard(values.buttonList);

        scheme.push(ctx => {
          ctx.replyWithMarkdown('Keyboard updated', keyboard);

          return ctx.wizard.next();
        });
        break;

      case 'INLINE_KEYBOARD':
        keyboard = createInlineKeyboard(values.buttonList);

        scheme.push(ctx => {
          Telegraf.on('text', keyboard);

          return ctx.wizard.next();
        });
        break;
    }
  });

  const scene = new WizardScene('scene', ...scheme);
  scene.enter();

  const stage = new Stage([scene]);
  stage.hears('exit', ctx => ctx.scene.leave());

  bot.use(session(), stage.middleware());

  bot.use(
    bot.start(ctx => {
      ctx.scene.enter('scene');

      ctx.reply(getStartCommand(payload));
    }),
  );
};
