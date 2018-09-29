const {
    authorize,
    getNewToken,
} = require('./oauth');
const {
    listLabels,
    listMessages,
    getMessage,
    listMessagesNext,
} = require('./api');

module.exports = {
    authorize,
    getNewToken,
    listLabels,
    listMessages,
    getMessage,
    listMessagesNext
};