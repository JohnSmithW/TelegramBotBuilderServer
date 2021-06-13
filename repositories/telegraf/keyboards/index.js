const { Markup } = require('telegraf');

exports.createKeyboard = buttons => {
  const buttonList = buttons.map(({ text }) => text);

  return Markup.keyboard(buttonList).resize();
};

exports.createInlineKeyboard = buttons => {
  const buttonList = buttons.map(({ text, callback }) =>
    Markup.button.callback(text, callback),
  );

  return Markup.inlineKeyboard(buttonList).resize();
};
