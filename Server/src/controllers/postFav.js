const { Favorite } = require('../DB_connection');
const { User } = require('../DB_connection');
const getAllFav = require("./getAllFav");

const postFav = async (req, res) => {
    const { userId, id, name, origin, status, image, species, gender } = req.body;
    try {
        if (id && userId && name && origin && status && image && species && gender) {
            console.log("postFav id ", id, ", user  ", userId);
            // Busco el usuario:
            const user = await User.findByPk(userId);
            if (!user) { throw Error("user not found"); }
            // Usuario encontrado. Busco el favorito:
            const [favorite, created] = await Favorite.findOrCreate({
                where: {
                    id,
                    name,
                    status,
                    species,
                    gender,
                    origin,
                    image,
                },
            });
            // Asocio el favorito al usuario si no estaba asociado previamente:
            await user.addFavorite(favorite);
            // Devuelvo todos los favoritos del usuario:
            const allFav = await getAllFav(userId);
            return res.status(200).json(allFav);
        } else {
            console.log("postFav id = all, user  ", userId);
            // si no me carga los datos sólo devuelvo lo que tengo. Es para que al iniciar el programa, se traiga los fav almacenados para mostrar.
            // Devuelvo todos los favoritos del usuario:
            const allFav = await getAllFav(userId);
            return res.status(200).json(allFav);
        }
    } catch (err) {
        console.log("ERROR-> ", err.message);
        return res.status(500).send(err.message);
    }
}
module.exports = postFav;
