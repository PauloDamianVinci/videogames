const { User } = require('../DB_connection');

const getAllFav = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) { throw Error("User not found"); }
        const favorites = await user.getFavorites({
            attributes: ['id', 'name', 'status', 'species', 'gender', 'origin', 'image'],
            through: {
                attributes: []
            },
        });
        return favorites;
    } catch (err) {
        console.log("ERROR-> ", err.message);
        return err.message;
    }
}
module.exports = getAllFav;
