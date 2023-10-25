const router = require("express").Router();
// Controllers:
const { getVideogames } = require("../controllers/getVideogames");
const getGenres = require("../controllers/getGenres");
const getPlatforms = require("../controllers/getPlatforms");
const postVideoGame = require("../controllers/postVideoGame");
const getVersionBack = require("../controllers/getVersionBack");
// Rutas:
router.get("/videogames", getVideogames); // obtiene un arreglo de objetos con los videojuegos
router.get("/videogames/:id", getVideogames); // obtiene el detalle de un videojuego por id
router.get("/genres", getGenres); // obtiene el listado de géneros
router.get("/platforms", getPlatforms); //  obtiene el listado de plataformas
router.post("/videogames", postVideoGame); //  crea un nuevo videojuego
router.get("/versionback", getVersionBack); // obtiene la versión del backend para que el front lo muestre en el about
module.exports = router;
