// Se obtienen y almacenan en BD los géneros.
require('dotenv').config();
const axios = require('axios');
const { Genre } = require('../DB_connection');
const videogamesApiUrl = process.env.videogamesApiUrl || 'https://api.rawg.io/api';
const apiKey = process.env.API_KEY || 'cb546394d1b84c418611a07508ddf047';
const showLog = require("../functions/showLog");

const getGenres = async (req, res) => {
    try {
        showLog(`getGenres:`);
        response = await axios.get(`${videogamesApiUrl}/genres?key=${apiKey}`)
        const dataRes = response.data.results;
        const allGenres = dataRes.map(el => {
            return {
                id: el.id,
                name: el.name,
            };
        });
        // Obtenidos los datos de la API, los guardo en BD, sin pisar:
        for (let dato of allGenres) {
            await Genre.findOrCreate({
                where: { id: dato.id, name: dato.name },
            })
        }
        const resp = await Genre.findAll();
        res.status(200).json(resp);
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getGenres;
