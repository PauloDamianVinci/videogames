const server = require("./src/app");
const showLog = require("./src/functions/showLog");
const { conn } = require('./src/DB_connection');
const { PORT, SECURE } = require('./src/functions/paramsEnv');

let conSegura = '';
SECURE ? conSegura = 'SECURE' : conSegura = 'NOT SECURE';

conn.sync({ alter: true }).then(() => {
    server.listen(PORT, () => {
        showLog(`Server running into ${PORT} Port. DB Connection: ${conSegura}`);
    });
})
    .catch(err => showLog(err))

