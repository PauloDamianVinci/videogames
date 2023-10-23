const express = require("express");
const router = require("./routes/index");
const server = express();

// middleware para tener acceso sin seguridad:
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
// middleware para manejar formato json (body):
server.use(express.json());
// middleware para anteponerle "/rickandmorty" a las rutas:
server.use("/rickandmorty", router);

module.exports = server;