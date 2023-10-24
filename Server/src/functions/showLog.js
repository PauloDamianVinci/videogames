// Muestra el log por consola si se habilita por parámetro.
require('dotenv').config();
const log = process.env.LOG || true;

const showLog = (text) => {
    if (!log) return;
    console.log(text);
};
module.exports = showLog;