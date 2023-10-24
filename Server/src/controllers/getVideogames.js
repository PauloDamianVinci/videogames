require('dotenv').config();
const axios = require('axios');
const videogamesApiUrl = process.env.videogamesApiUrl || 'https://api.rawg.io/api/games/';
const apiKey = process.env.API_KEY || 'cb546394d1b84c418611a07508ddf047';

const getVideogames = async (req, res) => {

    try {
        // const { id } = req.params;
        // const { name } = req.query;




        // console.log("getVideogames ", id);
        // //const response = await axios.get(`${videogamesApiUrl}${charId}`)

        // //const { id, name, gender, species, origin, image, status } = response.data;
        // //const character = { id, name, gender, species, origin, image, status };
        res.json(character);
    } catch (err) {
        console.log("ERROR-> ", err.message);
        return res.status(err.response.status).send(err.message);
    }
};
module.exports = getVideogames;


//               https://api.rawg.io/api/games
// Videojuegos: "https://api.rawg.io/api/games"
// Por id: "https://api.rawg.io/api/games/{id}"
// Por nombre: "https://api.rawg.io/api/games?search={game}"
// Por genero: "https://api.rawg.io/api/genres"

//? 📍 GET | /videogames
// Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.
//? 📍 GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.
//? 📍 GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
