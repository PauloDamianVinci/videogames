const axios = require('axios');
require('dotenv').config();
const { Videogame, Genre, Platform } = require('../DB_connection');
const videogamesApiUrl = process.env.videogamesApiUrl || 'https://api.rawg.io/api';
const apiKey = process.env.API_KEY || 'cb546394d1b84c418611a07508ddf047';
const showLog = require("../functions/showLog");
const makeObject = require("../functions/makeObject");

const getVideogames = async (req, res) => {
    // Si no tengo params ni query -> obtengo todos los videojuegos de DB + API
    // Si tengo params -> obtengo todos los videojuegos de DB + API por id
    // Si tengo query -> obtengo todos los videojuegos de DB + API por name
    try {
        const { id } = req.params;
        const { source, search } = req.query;
        let resp;
        showLog(`getVideogames:`);
        if (source === '1') { // origen DB
            resp = await getFromDB(id, search);
        } else if (source === '2') { // origen API
            resp = await getFromAPI(id, search);
        } else { // ambos orígenes
            const fromDB = await getFromDB(id, search);
            const fromAPI = await getFromAPI(id, search);
            resp = fromDB.concat(fromAPI);
        }
        res.status(200).json(resp);
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

const getFromDB = async (idV, nameV) => {
    // Obtengo los videojuegos de la DB
    try {
        let criteria;
        if (id) {
            showLog(`by id=${id}`);
            criteria = { id: id };
        } else if (name) {
            showLog(`by name=${name}`);
            criteria = { name: name };
        } else {
            showLog(`all`);
            criteria = {};
        };

        const reg = await Videogame.findAll({
            where: criteria,
            attributes: ['id', 'name', 'description', 'image', 'released_date', 'rating'],
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            },
            model: Platform,
            attributes: ['name'],
            through: {
                attributes: []
            },
        });
        return reg;
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return res.status(err.response.status).send(err.message);
    }
};

const getFromAPI = async (idV, nameV) => {
    // Obtengo los videojuegos de la API
    try {
        let response;
        let dataRes;
        let res;
        if (idV) { // por id
            showLog(`by id=${idV}`);
            response = await axios.get(`${videogamesApiUrl}/games/${idV}?key=${apiKey}`)
            dataRes = response.data;
            res = makeObject(dataRes, false);
        } else if (nameV) { // por nombre
            showLog(`by name=${nameV}`);
            response = await axios.get(`${videogamesApiUrl}/games?key=${apiKey}&search=${nameV}`)
            dataRes = response.data.results;
            res = makeObject(dataRes, true);
        } else { // trae todos los videojuegos
            showLog(`all`);
            response = await axios.get(`${videogamesApiUrl}/games?key=${apiKey}`)
            dataRes = response.data.results;
            res = makeObject(dataRes, true);
        };
        return res;
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return err.message;
    }
};

module.exports = { getVideogames, getFromDB, getFromAPI };

// Videojuegos: "https://api.rawg.io/api/games"
// Por id: "https://api.rawg.io/api/games/{id}"
// Por nombre: "https://api.rawg.io/api/games?search={game}"
// Por genero: "https://api.rawg.io/api/genres"

//? 📍 GET | /videogames
// Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.
//? 📍 GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.
//? 📍 GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
