// ! Almacena un nuevo videojuego en base de datos, si no es repetido.
const { Videogame } = require('../DB_connection');
const { Genre } = require('../DB_connection');
const { Platform } = require('../DB_connection');
const showLog = require("../functions/showLog");
const { Op } = require('sequelize');

const postVideoGame = async (req, res) => {
    const { name, description, image, released_date, rating, platform, genre } = req.body;
    showLog(`postVideoGame`);
    try {
        if (!name || !description || !image || !released_date || !rating || !platform || !genre) { throw Error("Data missing"); }
        // Verifico si ya existe un registro con el mismo nombre:
        const nameLowercase = name.toLowerCase();
        const existingVideogame = await Videogame.findOne({
            where: { name: { [Op.iLike]: nameLowercase } },
        });
        if (existingVideogame) {
            showLog(`postVideoGame: the game ${name} already exists`);
            return res.status(409).send(`The game ${name} already exists. Choose another one.`);
        }
        // Creo el registro si no existe:
        const [VideogameCreated, created] = await Videogame.findOrCreate({
            where: { name: name, description, image, released_date, rating, OriginDB: true },
        });
        let genreCreated = await Genre.findAll({
            where: { name: genre }
        });
        let platformCreated = await Platform.findAll({
            where: { name: platform }
        })
        // Obtengo el ID para devolver al front:
        const createdVideogameId = VideogameCreated.id;
        //Agrego los datos relacionados:
        VideogameCreated.addGenre(genreCreated);
        VideogameCreated.addPlatform(platformCreated);
        showLog(`postVideoGame OK`);
        return res.status(200).json({ "created": "ok", "id": createdVideogameId });
    } catch (err) {
        showLog(`postVideoGame ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postVideoGame;