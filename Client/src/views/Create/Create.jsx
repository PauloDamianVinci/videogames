// ! Creación de videojuego
import axios from 'axios';
// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postVidegame, paginacionPendiente, resetFilterAndOrder } from "../../redux/actions";
// Funciones:
import validations from "./validations";
import orderArray from "../../functions/orderArray";
// Variables de entorno:
const IMG_HELP = import.meta.env.VITE_IMG_ABOUT || '/src/assets/Face.jpg';
const IMG_LOGO_NAV = import.meta.env.VITE_IMG_LOGO_NAV || '/src/assets/ImgNav.jpeg';
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const VG_V = import.meta.env.VITE_VG_VIDEOGAMES || '/videogames';
const VG_VIDEOGAMES = API_URL_BASE + VG_V;

// Estilos: 
import style from "./Create.module.css";
const { labelTitle, containerSelect, mainTextErrorRating, mainTextRating, mainTextError, containerTitle, img, linkText, ratingText, dateText, label, contButtonShort, selectCombo, mainText, container, contButton, button, containerData, errorsCreate } = style;

const Create = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Obtengo géneros y plataformas, los ordeno alfabéticamente:
    let genres = useSelector((state) => state?.genres);
    let genresOrdered = orderArray(genres);
    let platforms = useSelector((state) => state?.platforms);
    let platformsOrdered = orderArray(platforms);
    // Obtengo los posibles errores:
    let errorCreate = useSelector((state) => state?.errors);
    const [huboAlta, setHuboAlta] = useState(false);
    const [gameData, setGameData] = useState({
        name: "",
        description: "",
        image: "",
        released_date: "",
        rating: "",
        genre: [],
        platform: [],
    });
    // Estado de manejo de errores:
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        image: "",
        released_date: "",
        rating: "",
        genre: [],
        platform: [],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validations(gameData);
        setErrors(formErrors);
        if (Object.keys(formErrors).length !== 0) {
            return;
        }
        // Verifico repetición de nombre y grabación mediante axios:
        const endpoint = VG_VIDEOGAMES;
        const { data } = axios.post(endpoint, gameData)
            .then(({ data }) => {
                const aux = {
                    id: data.id,
                    name: gameData.name,
                    image: gameData.image,
                    description: gameData.description,
                    released_date: gameData.released_date,
                    rating: gameData.rating,
                    Platforms: gameData.platform && gameData.platform.map(el => ({ name: el })),
                    Genres: gameData.genre && gameData.genre.map(el => ({ name: el })),
                    OriginDB: true,
                }
                dispatch(postVidegame(aux)); // actualizo el store con el nuevo registro
                setHuboAlta(true);
                setGameData({
                    name: "",
                    description: "",
                    image: "",
                    released_date: "",
                    rating: "",
                    genre: [],
                    platform: [],
                });
                window.alert("Game created!");
            })
            .finally(() => {

            })
            .catch((error) => {
                let msg = '';
                if (!error.response) {
                    msg = error;
                } else {
                    msg = "error " + error.response.status + " - " + error.response.data;
                }
                window.alert(msg);
            });
    }

    function handleBack() {
        // Regreso a la pantalla principal, pero limpio filtros porque agregué nuevos datos
        // y merecen ser ordenados desde cero:
        if (huboAlta) {
            // reinicio los filtros y ordenamientos:
            dispatch(resetFilterAndOrder());
        } else {
            dispatch(paginacionPendiente(true)); // para conservar la página actual en home
        }
        navigate(-1);
    }

    function handlePasteLink() {
        // pego un link a una imagen de ejemplo
        setGameData(prevGameData => ({
            ...prevGameData,
            image: IMG_HELP,
        }));
    }

    function handleSelectGenre(e) {
        // Verifico repetición:
        const selectedGenre = e.target.value;
        if (gameData.genre.includes(selectedGenre)) { return; }
        setGameData((prevInput) => ({
            ...prevInput,
            genre: [...prevInput.genre, selectedGenre],
        }));
        setErrors(validations({
            ...gameData,
            genre: [...gameData.genre, selectedGenre],
        }));
    }

    function handleSelectPlatform(e) {
        // Verifico repetición:
        const selectedPlatform = e.target.value
        if (gameData.platform.includes(selectedPlatform)) { return; }
        setGameData((prevInput) => ({
            ...prevInput,
            platform: [...prevInput.platform, selectedPlatform],
        }));
        setErrors(validations({
            ...gameData,
            platform: [...gameData.platform, selectedPlatform],
        }));
    }

    function handleRemoveGenre(genre) {
        setGameData((prevInput) => ({
            ...prevInput,
            genre: prevInput.genre.filter((g) => g !== genre),
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            genre: "",
        }));
    }

    function handleRemovePlatform(platform) {
        setGameData((prevInput) => ({
            ...prevInput,
            platform: prevInput.platform.filter((p) => p !== platform),
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            platform: "",
        }));
    }

    function handleChange(e) {
        const property = e.target.name;
        const value = e.target.value;
        setGameData({
            ...gameData,
            [property]: value
        });
        setErrors(validations({ ...gameData, [property]: value }))
    }

    return (
        <form className={container} onSubmit={handleSubmit}>
            <h2 className={containerTitle}>Let's create!</h2>
            <div className={containerData}>
                {/* <label className={label} htmlFor="name">Name:</label> */}
                <input className={`${errors.name ? mainTextError : mainText}`}
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={gameData.name}
                    onChange={handleChange}
                    id="name"
                    autoComplete="name"
                />

            </div>


            <div className={containerData}>
                <textarea className={`${errors.name ? mainTextError : mainText}`}
                    name="description"
                    placeholder="Description"
                    value={gameData.description}
                    onChange={handleChange}
                    id="description"
                    maxLength="150"
                    rows="4"
                />
            </div>












            <div className={containerData}>
                {/* <label className={label} htmlFor="image">Image:</label> */}
                <input className={`${errors.image ? mainTextError : mainText}`}
                    name="image"
                    type="text"
                    placeholder="Image URL"
                    value={gameData.image}
                    onChange={handleChange}
                    id="image"
                />

                <div className={contButton}>
                    <button className={button} onClick={() => handlePasteLink()} >Gimme me a link</button>
                </div>
            </div>
            <div className={containerData}>
                {/* <label className={label} htmlFor="released_date">Released date:</label> */}
                <input className={`${errors.released_date ? mainTextError : mainText}`}
                    name="released_date"
                    type="text"
                    placeholder='Released date (yyyy-mm-dd)'
                    value={gameData.released_date}
                    onChange={handleChange}
                    id="released_date"
                />

            </div>
            <div className={containerData}>
                {/* <label className={label} htmlFor="rating">Rating:</label> */}
                <input className={`${errors.rating ? mainTextErrorRating : mainTextRating}`}
                    name="rating"
                    type="text"
                    placeholder='Rating (1-10)'
                    value={gameData.rating}
                    onChange={handleChange}
                    id="rating"
                />

            </div>
            <div className={containerSelect}>
                {/* Selección de géneros: */}
                <label className={labelTitle} htmlFor="genre">Genre/s</label>
                <select className={selectCombo}
                    name="genre"
                    multiple
                    value={gameData.genre}
                    onChange={handleSelectGenre}
                    id="genre"
                >
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <div className={label}>
                    Selected: {" "}
                    {gameData.genre.map((genre) => (
                        <span key={genre}>
                            {` ${genre}`}
                            <button className={contButtonShort} onClick={() => handleRemoveGenre(genre)}>x</button>
                        </span>
                    ))}
                </div>

            </div>
            <div className={containerSelect}>
                {/* Selección de plataformas: */}
                <label className={labelTitle} htmlFor="platform">Platform/s</label>
                <select className={selectCombo}
                    name="platform"
                    multiple
                    value={gameData.platform}
                    onChange={handleSelectPlatform}
                    id="platform"
                >
                    {platforms.map((plat) => (
                        <option key={plat.id} value={plat.name}>
                            {plat.name}
                        </option>
                    ))}
                </select>
                <div className={label}>
                    Selected: {" "}
                    {gameData.platform.map((platform) => (
                        <span key={platform}>
                            {` ${platform}`}
                            <button className={contButtonShort} onClick={() => handleRemovePlatform(platform)}>x</button>
                        </span>
                    ))}
                </div>

            </div>
            <span className={errorsCreate}>{errors.name}</span>
            <span className={errorsCreate}>{errors.description}</span>
            <span className={errorsCreate}>{errors.image}</span>
            <span className={errorsCreate}>{errors.released_date}</span>
            <span className={errorsCreate}>{errors.rating}</span>
            <span className={errorsCreate}>{errors.genre}</span>
            <span className={errorsCreate}>{errors.platform}</span>


            <p className={contButton} href="/">

                {/* <button className={button} type="submit" disabled={formSubmitted}> */}
                <button className={button} type="submit" >
                    Create game!
                </button>
            </p>
            <div className={contButton}>
                <button className={button} onClick={() => handleBack()} >Don't wanna play anymore</button>
            </div>
        </form >
    )
};

export default Create;
