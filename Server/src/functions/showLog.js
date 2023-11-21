// !  Muestra el log por consola y también lo guarda en un archivo, si se habilita por parámetro.
const { apiKey, MUST_LOG } = require('../functions/paramsEnv');
const fs = require('fs');

const showLog = (text) => {
    if (parseInt(MUST_LOG) === 1) {
        fs.appendFile("log.txt", new Date().toLocaleString() + " - " + apiKey + ": " + text + '\n', (err) => {
            if (err) {
                console.log("(no se guardó log) ", text);
            } else {
                console.log(text);
            }
        });
    }
};
module.exports = showLog;