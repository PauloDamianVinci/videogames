const router = require("express").Router();
// Controllers:
const getVideogames = require("../controllers/getVideogames");
const getGenres = require("../controllers/getGenres");
const getPlatforms = require("../controllers/getPlatforms");
const postVideoGame = require("../controllers/postVideoGame");
const getVersionBack = require("../controllers/getVersionBack");
// Rutas:
router.get("/videogames", getVideogames); // obtiene un arreglo de objetos con los videojuegos
router.get("/videogames/name", getVideogames); // obtiene el detalle de un videojuego por query
router.get("/videogames/:id", getVideogames); // obtiene el detalle de un videojuego por id
router.get("/genres", getGenres); // obtiene el listado de géneros
router.get("/platforms", getPlatforms); //  obtiene el listado de plataformas
router.post("/videogames", postVideoGame); //  crea un nuevo videojuegos
router.get("/versionback", getVersionBack); // obtiene la versión del backend para que el front lo muestre en el about
module.exports = router;

//! getVideogames:
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
//! postVideoGame:
//? 📍 POST | /videogames
// Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).
//! getGenres:
//? 📍 GET | /genres
// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.