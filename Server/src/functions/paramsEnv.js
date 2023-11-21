//! Unico lugar donde obtengo las variables de entorno.
require('dotenv').config();

const videogamesApiUrl = process.env.videogamesApiUrl || 'https://api.rawg.io/api';
const apiKey = process.env.API_KEY || 'e06b3029c99749edb7567fccf682835c';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || 'videogames';
const SECURE = process.env.SECURE || false;
const log = process.env.LOG || true;
const PORT = process.env.PORT || 3001;

module.exports = {
    videogamesApiUrl,
    apiKey,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    SECURE,
    PORT,
    log
};