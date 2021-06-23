const {
  Telegraf,
  session,
  Scenes: { WizardScene, Stage },
} = require('telegraf');
const { axiosGet } = require('../../../http');
const _ = require('lodash');
const { select, $each } = require('qim');
const { getStartCommand } = require('../../../utils/bot/getStartCommand');
const { createKeyboard, createInlineKeyboard } = require('../keyboards');
const { formatData } = require('../../../utils/bot/formatData');

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
        const { entrance, entry, variableList } = values;

        // (async () => {
        //   const response = await axiosGet(entrance + 'cat');

        //   const data = variableList.map(({ key }) =>
        //     select([entry, $each, key], response.data),
        //   );

        //   console.log(formatData(varList, data));
        // })();

        scheme.push(
          Telegraf.on('text', async ctx => {
            const varList = variableList.map(({ variable }) => variable);
            const response = await axiosGet(entrance + ctx.message.text);

            const data = variableList.map(({ key }) =>
              select([entry, $each, key], response.data),
            );

            formatData(varList, data);

            // await ctx.replyWithHTML(
            //   'hey<a href="https://homepages.cae.wisc.edu/~ece533/images/airplane.png">""</a>',
            // );

            await ctx.replyWithPhoto(
              {
                url: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
              },
              {
                caption: `cat photo\ngay`,
              },
            );

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
