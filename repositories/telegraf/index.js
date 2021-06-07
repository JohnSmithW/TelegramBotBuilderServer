const {
  Telegraf,
  session,
  Scenes: { WizardScene, Stage },
  Markup,
} = require('telegraf');

class BotBrother {
  constructor(token) {
    this.token = token;
  }
}

module.exports = BotBrother;
