const { Favorite } = require('../DB_connection');
const { User } = require('../DB_connection');
const getAllFav = require("./getAllFav");

const deleteFav = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    console.log("deleteFav id ", id, ", user  ", userId);
    try {
        if (!id) return res.status(401).send("Falta id");
        // Verifico si el usuario existe:
        const user = await User.findByPk(userId);
        if (!user) { return res.status(404).json({ error: 'User not found' }); }
        // Verifico si el favorito existe:
        const favorite = await Favorite.findByPk(id);
        if (!favorite) { return res.status(404).json({ error: 'Favorite not found' }); }
        // Elimino la asociación entre el usuario y el favorito:
        await user.removeFavorite(favorite);
        // devuelvo todos los favoritos del usuario:
        const allFav = await getAllFav(userId);
        return res.status(200).json(allFav);
    } catch (err) {
        console.log("ERROR-> ", err.message);
        return res.status(500).send(err.message);
    }
}
module.exports = deleteFav;
