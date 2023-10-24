require('dotenv').config();
require('pg'); // requerido por Vercel para deploy
const { Sequelize } = require('sequelize');
// Parámetros de entorno:
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || 'videogames';
const SECURE = process.env.SECURE || false;
// Definición de modelos:
const VideogameModel = require('../src/models/Videogame');
const GenreModel = require('../src/models/Genre');
const PlatformModel = require('../src/models/Platform');
// Determino la conexión según el entorno:
let strConn = '';
if (SECURE) {
   // conexión segura (para BDD remota):
   strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`;
} else {
   // conexión no segura (para BDD local):
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
