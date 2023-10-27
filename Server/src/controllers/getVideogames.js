// Se realizan las diversas funciones de obtención de videojuegos.
require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../DB_connection');
const videogamesApiUrl = process.env.videogamesApiUrl || 'https://api.rawg.io/api';
const apiKey = process.env.API_KEY || 'cb546394d1b84c418611a07508ddf047';
const showLog = require("../functions/showLog");
const { Op } = require('sequelize');
const makeObject = require("../functions/makeObject");

const getVideogames = async (req, res) => {
    // Criterios de operación:
    // Si no tengo params ni query -> obtengo todos los videojuegos de DB + API.
    // Si tengo params -> obtengo todos los videojuegos de DB + API por id.
    // Si tengo query -> obtengo todos los videojuegos de DB + API por name.
    try {
        const { id } = req.params;
        const { source, search } = req.query;
        let resp;
        showLog(`getVideogames:`);
        switch (source) {
            case '1': // origen DB
                resp = await getFromDB(id, search);
                break;
            case '2': // origen API
                resp = await getFromAPI(id, search);
                break;
            case '3': // ambos orígenes
                const fromDB = await getFromDB(id, search);
                const fromAPI = await getFromAPI(id, search);
                resp = fromDB.concat(fromAPI);
                break;
            default: // no se indica source cuando se busca por id, ya que se
                // determina dónde buscar en base al tipo de id recibido
                if (isNaN(id)) {
                    resp = await getFromDB(id, search);
                } else {
                    resp = await getFromAPI(id, search);
                }
        }
        res.status(200).json(resp);
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

const getFromDB = async (idV, nameV) => {
    // Función llamada internamente. Obtengo los videojuegos de la DB.
    try {
        let reg;
        if (idV) { // por id
            showLog(`by id=${idV} (DB)`);
            reg = await Videogame.findAll({
                attributes: ["id", "name", "image", "description", "released_date", "rating", "OriginDB"],
                where: { id: idV },
                include: [
                    {
                        model: Platform,
                        attributes: ["name"],
                        through: { attributes: [], },
                    },
                    {
                        model: Genre,
                        attributes: ["name"],
                        through: { attributes: [], },
                    },
                ]
            });
        } else if (nameV) { // por nombre. No es case sensitive y además es aproximada.
            showLog(`by name=${nameV} (DB)`);
            reg = await Videogame.findAll({
                attributes: ["id", "name", "image", "description", "released_date", "rating", "OriginDB"],
                where: {
                    name: {
                        [Op.iLike]: `%${nameV}%`
                    }
                },
                include: [
                    {
                        model: Platform,
                        attributes: ["name"],
                        through: { attributes: [], },
                    },
                    {
                        model: Genre,
                        attributes: ["name"],
                        through: { attributes: [], },
                    },
                ]
            });
        } else { // trae todos los videojuegos
            showLog(`all (DB)`);
            reg = await Videogame.findAll({
                attributes: ["id", "name", "image", "description", "released_date", "rating", "OriginDB"],
                include: [
                    {
                        model: Platform,
                        attributes: ["name"],
                        through: { attributes: [], },
                    },
                    {
                        model: Genre,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ]
            });
        };
        return reg;
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return err.message;
    }
};

const getFromAPI = async (idV, nameV) => {
    // Función llamada internamente. Obtengo los videojuegos de la API.
    try {
        let response;
        let dataRes;
        let res;
        if (idV) { // por id
            showLog(`by id=${idV} (API)`);
            response = await axios.get(`${videogamesApiUrl}/games/${idV}?key=${apiKey}`)
            dataRes = response.data;
            res = makeObject(dataRes, 1);
        } else if (nameV) { // por nombre
            showLog(`by name=${nameV} (API)`);
            response = await axios.get(`${videogamesApiUrl}/games?key=${apiKey}&search=${nameV}`)
            dataRes = response.data.results;
            res = makeObject(dataRes, 15); // búsqueda limitada a 15 resultados
        } else { // trae todos los videojuegos
            showLog(`all (API)`);
            response = await axios.get(`${videogamesApiUrl}/games?key=${apiKey}`)
            dataRes = response.data.results;
            res = makeObject(dataRes, 100); // búsqueda limitada a 100 resultados
        };
        return res;
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return err.message;
    }
};

module.exports = { getVideogames };
