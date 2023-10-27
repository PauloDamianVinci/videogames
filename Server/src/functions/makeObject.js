// Cargo y devuelvo los datos recibidos en el objeto. Se usa para los videojuegos, ya que
// pueden solicitarse de diferentes maneras.
//const showLog = require("./showLog");

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
                Platforms: data[i].platforms.map(el => el.platform.name),
                Genres: data[i].genres.map(el => el.name),
                OriginDB: false,
            }
            salida.push(aux);
        }
        return salida;
    } else {
        // Esta búsqueda no itera, es de un sólo resultado:
        let aux = [];
        let salida = [];
        //let Platforms = [];
        aux = {
            id: data.id,
            name: data.name,
            image: data.background_image,
            description: data.description_raw, // este dato no viene pero lo mantengo por compatibilidad
            released_date: data.released,
            rating: data.rating,
            Platforms: data.platforms.map(el => el.platform.name),
            Genres: data.genres.map(el => el.name),
            //Platforms: data.platforms.map(el => el.platform.name),
            //Genres: data.genres.map(el => el.name),
            OriginDB: false,
        }
        salida.push(aux);
        return salida;
    }
};
module.exports = makeObject;