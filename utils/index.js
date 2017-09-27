'use strict';

require('dotenv').config();

module.exports = {
    initBot() {
        const builder = require('botbuilder');
        const connector = module.exports.getConnector(builder);
        module.exports.startServer(connector);
        return module.exports.getBot(builder, connector);
    },

    startServer(connector) {
        var restify = require('restify');
        var server = restify.createServer();
        server.listen(
            process.env.port || process.env.PORT || 3978,
            () => console.log('%s listening to %s', server.name, server.url));
        server.post('/api/messages', connector.listen());
    },

    getConnector(builder) {
        return new builder.ChatConnector({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword,
            stateEndpoint: process.env.BotStateEndpoint,
            openIdMetadata: process.env.BotOpenIdMetadata
        });
    },

    getBot(builder, connector) {
        return new builder.UniversalBot(connector, {
            localizerSettings: {
                defaultLocale: process.env.DEFAULT_LOCALE
            }
        });
    }
};
