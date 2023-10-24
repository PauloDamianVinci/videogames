require('dotenv').config();
const axios = require('axios');
const videogamesApiUrl = process.env.videogamesApiUrl || 'https://api.rawg.io/api/games/';
const apiKey = process.env.API_KEY || 'cb546394d1b84c418611a07508ddf047';
const showLog = require("../functions/showLog");

const getGenres = async (req, res) => {

    try {
        // const { id: charId } = req.params;
        // showLog("getCharById ", charId);
        // const response = await axios.get(`${videogamesApiUrl}${charId}`)

        // const { id, name, gender, species, origin, image, status } = response.data;
        // const character = { id, name, gender, species, origin, image, status };
        // res.json(character);
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return res.status(err.response.status).send(err.message);
    }
};
module.exports = getGenres;


// Videojuegos: "https://api.rawg.io/api/games"
// Por id: "https://api.rawg.io/api/games/{id}"
// Por nombre: "https://api.rawg.io/api/games?search={game}"
// Por genero: "https://api.rawg.io/api/genres"