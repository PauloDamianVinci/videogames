// Se almacena un nuevo videojuego en base de datos.
const { Videogame } = require('../DB_connection');
const { Genre } = require('../DB_connection');
const { Platform } = require('../DB_connection');
const showLog = require("../functions/showLog");

const postVideoGame = async (req, res) => {
    const { name, description, image, released_date, rating, platform, genre } = req.body;
    showLog(`postVideoGame`);
    try {
        if (!name || !description || !image || !released_date || !rating || !platform || !genre) { throw Error("Data missing"); }
        const [VideogameCreated, created] = await Videogame.findOrCreate({
            where: { name, description, image, released_date, rating, OriginDB: true },
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
        return res.status(200).json({ "created": "ok", "id": createdVideogameId });
    } catch (err) {
        showLog(`postVideoGame ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postVideoGame;
