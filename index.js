const apiGmail = require('./gmail');
const fs = require('fs');
const { SAVE_PATH, ACTUAL_PATH } = require('./const/const');
const excluAdresse = fs.readFileSync(SAVE_PATH, 'utf8').split('\n');

function getNameAndAdresse(metas) {
    const datas = metas.headers[0].value.split('<');
    datas[0] = datas[0].trim();
    if (datas[1]) {
        datas[1] = datas[1].substring(0, datas[1].length - 1).trim();
    } else {
        datas[1] = datas[0];
    }
    return datas;
}
function isNewAdresse(adresse) {
    if (excluAdresse.includes(adresse)) {
        return false;
    } else {
        return true;
    }
}

function saveNewLine(metas){
    const datas = getNameAndAdresse(metas);
    if(isNewAdresse(datas[1])) {
        excluAdresse.push(datas[1]);
        const newLine = datas[0] + ';' + datas[1] + '\n';
        fs.appendFile(SAVE_PATH, `${datas[1]}\n`, (err) => {
            if (err) return console.error(err);
        });
        fs.appendFile(ACTUAL_PATH, newLine, (err) => {
            if (err) return console.error(err);
        });
    }
}



async function start() {
    apiGmail.authorize((auth) => {
        apiGmail.listMessages(auth, async (messagesData) => {
            let messages = messagesData.messages;
            if(messagesData.nextPageToken){
                apiGmail.listMessagesNext(messagesData.messages, auth, messagesData.pageToken, (messages) => {
                    messages.forEach((message) => {
                        apiGmail.getMessage(auth, message.id, (metas) => {
                            if (metas) {
                                saveNewLine(metas);
                            }
                        });
                    });
                });
            } else {
                messages.forEach((message) => {
                    apiGmail.getMessage(auth, message.id, (metas) => {
                        if (metas) {
                            saveNewLine(metas);
                        }
                    });
                });
            }

        });
    });
}

start();