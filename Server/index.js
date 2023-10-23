// ! No mover este archivo a otra ubicación porque Vercel no lo va a entender a la hora del deploy

require('dotenv').config();
const server = require("./src/app");
const { conn } = require('./src/DB_connection');
const PORT = process.env.PORT || 3001;
const SECURE = process.env.SECURE || false;

let conSegura = '';
SECURE ? conSegura = 'SECURE' : conSegura = 'NOT SECURE';

conn.sync({ alter: true }).then(() => {
    server.listen(PORT, () => {
        console.log(`Server running into ${PORT} Port. DB Connection: ${conSegura}`);
    });
})
    .catch(err => console.log(err))

