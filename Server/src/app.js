const express = require("express");
const router = require("./routes/index");
const server = express();

// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');

// server.use(bodyParser.urlencoded({ extended: true, limit: '250mb' }));
// server.use(bodyParser.json({ limit: '250mb' }));
// server.use(cookieParser());

// Middleware para tener acceso sin seguridad:
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// Middleware para manejar formato json (body):
server.use(express.json());
// Middleware para anteponerle "/videogames" a las rutas:
server.use("/videogames", router);
module.exports = server;