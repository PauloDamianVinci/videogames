// ! Edita un videojuego almacenado en base de datos.
const { Videogame } = require('../DB_connection');
const { Genre } = require('../DB_connection');
const { Platform } = require('../DB_connection');
const showLog = require('../functions/showLog');

const putVideoGame = async (req, res) => {
    const { name, description, image, released_date, rating, platform, genre } = req.body;
    const { id } = req.params;
    showLog('putVideoGame');
    try {
        if (!id || !name || !description || !image || !released_date || !rating || !platform || !genre) {
            throw new Error('Data missing');
        }
        const existingVideogame = await Videogame.findByPk(id);
        if (!existingVideogame) {
            showLog(`putVideoGame: game with ID ${id} not found.`);
            return res.status(404).send(`Game with ID ${id} not found.`);
        }
        // Actualizo los campos:
        existingVideogame.name = name;
        existingVideogame.description = description;
        existingVideogame.image = image;
        existingVideogame.released_date = released_date;
        existingVideogame.rating = rating;
        await existingVideogame.save();
        // Actualizo las relaciones:
        const genreCreated = await Genre.findAll({ where: { name: genre } });
        const platformCreated = await Platform.findAll({ where: { name: platform } });
        existingVideogame.setGenres(genreCreated);
        existingVideogame.setPlatforms(platformCreated);
        showLog('putVideoGame OK');
        return res.status(200).json({ updated: 'ok', id: existingVideogame.id });
    } catch (err) {
        showLog(`putVideoGame ERROR -> ${err.message}`);
        return res.status(500).send(err.message);
    }
};

module.exports = putVideoGame;