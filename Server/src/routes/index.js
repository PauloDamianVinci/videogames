const router = require("express").Router();
// Controllers:
const { getVideogames } = require("../controllers/getVideogames");
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

//! postVideoGame:
//? 📍 POST | /videogames
// Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).
