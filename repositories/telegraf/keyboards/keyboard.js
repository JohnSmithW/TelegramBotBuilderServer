const { Telegraf, Markup } = require('telegraf');

const createKeyboard = buttons => {
  return Markup.keyboard(buttons).resize();
};

const createInlineKeyboard = buttons => {
  return Markup.inlineKeyboard(buttons).resize();
};

module.exports = createKeyboard;
