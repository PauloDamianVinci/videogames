require('pg'); // requerido por Vercel para el deploy
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SECURE } = require('./functions/paramsEnv');
// Definición de modelos:
const VideogameModel = require('../src/models/Videogame');
const GenreModel = require('../src/models/Genre');
const PlatformModel = require('../src/models/Platform');
// Determino la conexión según el entorno:
let strConn = '';
if (SECURE) {
   // conexión segura (para BD remota):
   strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`;
} else {
   // conexión no segura (para BD local):
   strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}
const database = new Sequelize(
   strConn,
   { logging: false, native: false }
);
VideogameModel(database);
GenreModel(database);
PlatformModel(database);
// Relacionar modelos:
const { Videogame, Genre, Platform } = database.models;

Videogame.belongsToMany(Genre, { through: "videogame_genre" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });

Videogame.belongsToMany(Platform, { through: "videogame_platform" });
Platform.belongsToMany(Videogame, { through: "videogame_platform" });

module.exports = {
   Genre,
   Videogame,
   Platform,
   conn: database,
};
