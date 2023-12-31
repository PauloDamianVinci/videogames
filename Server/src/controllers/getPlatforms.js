// ! Obtiene y almacena en BD las plataformas.
const axios = require('axios');
const { Platform } = require('../DB_connection');
const { videogamesApiUrl, apiKey } = require('../functions/paramsEnv');
const showLog = require("../functions/showLog");

const getPlatforms = async (req, res) => {
    try {
        showLog(`getPlatforms`);
        response = await axios.get(`${videogamesApiUrl}/platforms?key=${apiKey}`)
        const dataRes = response.data.results;
        const allPlatforms = dataRes.map(el => {
            return {
                id: el.id,
                name: el.name,
            };
        });
        // Obtenidos los datos de la API, los guardo en BD, sin pisar:
        for (let dato of allPlatforms) {
            await Platform.findOrCreate({
                where: { id: dato.id, name: dato.name },
            })
        }
        const resp = await Platform.findAll();
        showLog(`getPlatforms OK`);
        res.status(200).json(resp);
    } catch (err) {
        showLog(`getPlatforms ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};
module.exports = getPlatforms;
