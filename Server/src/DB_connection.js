require('dotenv').config();
require('pg'); // requerido por Vercel para deploy
const { Sequelize } = require('sequelize');

const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || 'rickandNOOOOOOOOOOOmorty';
const SECURE = process.env.SECURE || false;

const UserModel = require('../src/models/User');
const FavoriteModel = require('../src/models/Favorite');

let strConn = '';
if (SECURE) {
   // conexión segura (para BDD remota):
   strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`;
} else {
   strConn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

const database = new Sequelize(
   strConn,
   { logging: false, native: false }
);

UserModel(database);
FavoriteModel(database);
// Relacionar modelos:
const { User, Favorite } = database.models;
User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" });

module.exports = {
   User,
   Favorite,
   conn: database,
};
