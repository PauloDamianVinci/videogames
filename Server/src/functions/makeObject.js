// Cargo y devuelvo los datos recibidos en el objeto. Se usa para los videojuegos, ya que pueden solicitarse de diferentes maneras.
//const showLog = require("./showLog");

const makeObject = (data, iteraciones) => {
    if (iteraciones > 1) {
        // Esta búsqueda tiene un límite de resultados, según lo solicitado:
        if (!data[0]) { throw Error("No data"); }
        let aux = [];
        let salida = [];
        for (let i = 0; i < iteraciones; i++) {
            if (!data[i]) { break; } // se acabaron los resultados antes del límite
            aux = {
                id: data[i].id,
                name: data[i].name,
                image: data[i].background_image,
                description: '', // este dato no viene pero lo mantengo por compatibilidad
                released: data[i].released_at,
                rating: data[i].rating,
                platform: data[i].platforms.map(el => el.platform.name),
                genre: data[i].genres.map(el => el.name),
            }
            salida.push(aux);
        }
        return salida;
    } else {
        // Esta búsqueda no itera, es de un sólo resultado:
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