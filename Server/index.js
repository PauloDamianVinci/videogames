require('dotenv').config();
const server = require("./src/app");
const showLog = require("./src/functions/showLog");
const { conn } = require('./src/DB_connection');
const PORT = process.env.PORT || 3001;
const SECURE = process.env.SECURE || false;

let conSegura = '';
SECURE ? conSegura = 'SECURE' : conSegura = 'NOT SECURE';

conn.sync({ alter: true }).then(() => {
    server.listen(PORT, () => {
        showLog(`Server running into ${PORT} Port. DB Connection: ${conSegura}`);
    });
})
    .catch(err => console.log(err))

