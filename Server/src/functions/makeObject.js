//const showLog = require("../functions/showLog");
// Cargo y devuelvo los datos recibidos en el objeto. Se usa para los videojuegos, ya que
// pueden solicitarse de diferentes maneras.

const makeObject = (data, iteraciones) => {
    if (iteraciones > 1) {
        // Esta búsqueda tiene un límite de resultados, según lo solicitado:
        if (!data[0]) { return []; }
        let aux = [];
        let salida = [];
        for (let i = 0; i < iteraciones; i++) {
            if (!data[i]) { break; } // se acabaron los resultados antes del límite
            aux = {
                id: data[i].id,
                name: data[i].name,
                image: data[i].background_image,
                description: '', // este dato no viene pero lo mantengo por compatibilidad
                released_date: data[i].released,
                rating: data[i].rating,
                Platforms: data[i].platforms && data[i].platforms.map(el => ({ name: el.platform.name })),
                Genres: data[i].genres && data[i].genres.map(el => ({ name: el.name })),
                OriginDB: false,
            }
            salida.push(aux);
        }
        return salida;
    } else {
        // Esta búsqueda no itera, es de un sólo resultado:
        let aux = [];
        let salida = [];
        aux = {
            id: data.id,
            name: data.name,
            image: data.background_image,
            description: data.description_raw,
            released_date: data.released,
            rating: data.rating,
            Platforms: data.platforms && data.platforms.map(el => ({ name: el.platform.name })),
            Genres: data.genres && data.genres.map(el => ({ name: el.name })),
            OriginDB: false,
        }
        salida.push(aux);
        return salida;
    }
};
module.exports = makeObject;