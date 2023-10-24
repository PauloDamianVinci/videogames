// Cargo y devuelvo los datos recibidos en el objeto.
//const showLog = require("./showLog");

const makeObject = (data, iterar) => {
    if (iterar) {
        if (!data[0]) { throw Error("No data"); }
        return data.map(el => {
            return {
                id: el.id,
                name: el.name,
                image: el.background_image,
                description: '', // este dato no viene pero lo mantengo por compatibilidad
                released: el.released_at,
                rating: el.rating,
                platform: el.platforms.map(el => el.platform.name),
                genre: el.genres.map(el => el.name),
            };
        });
    } else {
        return {
            id: data.id,
            name: data.name,
            image: data.background_image,
            description: data.description,
            released: data.released,
            rating: data.rating,
            platform: data.platforms.map(el => el.platform.name),
            genre: data.genres.map(el => el.name),
        };
    }
};
module.exports = makeObject;