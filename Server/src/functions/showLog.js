// !  Muestra el log por consola y también lo guarda en un archivo, si se habilita por parámetro.
const { apiKey, log } = require('../functions/paramsEnv');
const fs = require('fs');

const showLog = (text) => {
    if (!log) return;
    fs.appendFile("log.txt", new Date().toLocaleString() + " - " + apiKey + ": " + text + '\n', (err) => {
        if (err) {
            console.log("(no se guardó log) ", text);
        } else {
            console.log(text);
        }
    });
};
module.exports = showLog;