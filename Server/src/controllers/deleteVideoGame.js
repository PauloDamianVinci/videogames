// ! Almacena un nuevo videojuego en base de datos.
const { Videogame } = require('../DB_connection');
const { Genre } = require('../DB_connection');
const { Platform } = require('../DB_connection');
const showLog = require("../functions/showLog");

const deleteVideoGame = async (req, res) => {
    const { id } = req.params;
    showLog(`deleteVideoGame ${id}`);
    try {
        if (!id) { throw Error("Data missing"); }
        // Busco el videojuego por su ID con todas sus relaciones:
        const videogameToDelete = await Videogame.findByPk(id, {
            include: [Genre, Platform],
        });
        if (!videogameToDelete) { throw Error("ID not found"); }
        // Elimino las relaciones primero:
        await videogameToDelete.removeGenres(videogameToDelete.Genres);
        await videogameToDelete.removePlatforms(videogameToDelete.Platforms);
        // Finalmente elimino el videojuego:
        await videogameToDelete.destroy();
        showLog(`deleteVideoGame OK`);
        return res.status(200).json({ "deleted": "ok" });
    } catch (err) {
        showLog(`deleteVideoGame ERROR-> ${err.message}`);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteVideoGame;
