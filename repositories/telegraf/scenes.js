const {
  Telegraf,
  seesion,
  Scenes: { WizardScene, Stage },
} = require('telegraf');
const { axiosGet } = require('../../http');

exports.createScene = payload => {
  const sceneName = `scene${payload.id}`;
  const scheme = [];
  const message = '';

  switch (payload.type) {
    case 'MESSAGE_COMMAND':
      scheme.push(
        Telegraf.command(payload.command, async ctx => {
          message = ctx.message.text;

          return ctx.wizard.next();
        }),
      );

    case 'API_BLOCK':
      const query = payload.entrance;

      const response = async () => await axiosGet(query + message);

      scheme.push(
        Telegraf.reply(response, async ctx => {
          return ctx.scene.leave();
        }),
      );
  }

  const scene = new WizardScene(sceneName, scheme);

  scene.enter();

  const stage = new Stage([sceneName]);
  stage.hears('exit', ctx => ctx.scene.leave());
};
