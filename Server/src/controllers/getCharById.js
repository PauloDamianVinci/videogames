require('dotenv').config();
const axios = require('axios');
const videogamesApiUrl = process.env.videogamesApiUrl || 'https://rickandmortyapi.com/api/character/';

const getCharById = async (req, res) => {

    try {
        const { id: charId } = req.params;
        console.log("getCharById ", charId);
        const response = await axios.get(`${videogamesApiUrl}${charId}`)

        const { id, name, gender, species, origin, image, status } = response.data;
        const character = { id, name, gender, species, origin, image, status };
        res.json(character);
    } catch (err) {
        console.log("ERROR-> ", err.message);
        return res.status(err.response.status).send(err.message);
    }
};
module.exports = getCharById;
