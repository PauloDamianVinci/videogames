// ! Muestra el log por consola y también lo guarda en un archivo, si se habilita por parámetro.
require('dotenv').config();
const apiKey = process.env.API_KEY || 'cb546394d1b84c418611a07508ddf047';

const log = process.env.LOG || true;
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