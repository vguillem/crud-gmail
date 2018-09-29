const {google} = require('googleapis');

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.labels.list({
        userId: 'me',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const labels = res.data.labels;
        if (labels.length) {
            console.log('Labels:');
            labels.forEach((label) => {
                console.log(`- ${label.name}`);
            });
        } else {
            console.log('No labels found.');
        }
    });
}

async function listMessagesNext(result, auth, pageToken, callback) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list({
        userId: 'me',
        includeSpamTrash: false,
        pageToken,
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        if(res.data.nextPageToken) {
            return listMessagesNext(result.concat(res.data.messages), auth, res.data.nextPageToken, callback);
        }
        callback(result.concat(res.data.messages));
    });
}

/**
 * Lists the Messages in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listMessages(auth, callback) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list({
        userId: 'me',
        includeSpamTrash: false,
    }, async (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        callback(res.data);
    });
}

/**
 * Get the message in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {id} the message id.
 */
function getMessage(auth, id, callback) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.get({
        userId: 'me',
        id,
        format: 'metadata',
        metadataHeaders: ['From']
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        callback(res.data.payload);
    });
}

module.exports = {
    listLabels,
    listMessages,
    getMessage,
    listMessagesNext,
};