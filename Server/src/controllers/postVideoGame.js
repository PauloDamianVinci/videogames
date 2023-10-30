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
        // Verifico que no exista repetición de nombre en base de datos (no se verifica repetición en la API):
        let esRepe = false;
        esRepe = await Videogame.findOne({
            where: { name: name, },
        });
        if (esRepe) { throw Error("It already exists"); }
        const [VideogameCreated, created] = await Videogame.findOrCreate({
            where: { name, description, image, released_date, rating, OriginDB: true },
        });
        let genreCreated = await Genre.findAll({
            where: { name: genre }
        });
        let platformCreated = await Platform.findAll({
            where: { name: platform }
        })
        //Agrego los datos relacionados:
        VideogameCreated.addGenre(genreCreated);
        VideogameCreated.addPlatform(platformCreated);
        return res.status(200).json({ "created": "ok" });
    } catch (err) {
        showLog(`ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = postVideoGame;
