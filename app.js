'use strict';

const builder = require('botbuilder');
const utils = require('./utils');

const bot = utils.initBot();

bot.dialog('/', (session) =>
    session.send(`Hola ${session.message.user.name.split(" ", 1)[0]}, me dijiste: ${session.message.text}`));
