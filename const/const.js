const {client_id, client_secret, redirect_uris} = require('../template-conf');
const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.metadata'
];
const TOKEN_PATH = './gmail/token.json';
const TOKEN = '4/aQDR2sx8VBhxftf4N7VIrzl8mW6rVIcIbb8uZD88h4Jgky4B22KiS1k';
const SAVE_PATH = './files/all.csv';
const ACTUAL_PATH = './files/actual.csv';

module.exports = {
    CLIENT_ID: client_id,
    CLIENT_SECRET: client_secret,
    REDIRECT_URIS: redirect_uris,
    TOKEN_PATH,
    SCOPES,
    TOKEN,
    SAVE_PATH,
    ACTUAL_PATH,
};
