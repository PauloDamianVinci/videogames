// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getPlatforms } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { setRefreshHome, postVidegame, setNombreBusqueda, setOrigenBusqueda, resetAll, setDataLoaded, setCurrOrigin, setCurrPage } from "../../redux/actions";
// Funciones:
import validator from "./validations";
// Variables de entorno:
const HOME = import.meta.env.VITE_HOME || '/home';

// Estilos: 
import style from "./Create.module.css";
const { container, mainTitle, secondText, startButton, imgBack } = style;

const Create = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    let genres = useSelector((state) => state.genres);
    let platforms = useSelector((state) => state.platforms);

    useEffect(() => {
        // Cargo las plataformas. Ya tengo los géneros desde antes.
        setIsLoading(true);
        dispatch(getPlatforms());
        setIsLoading(false);
    }, []);

    const [gameData, setGameData] = useState({
        name: "juego 0001",
        description: "desc juego 01",
        image: "nada.img",
        released_date: "2020-01-01",
        rating: "2",
        genre: [],
        platform: [],
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        image: "",
        released_date: "",
        rating: "",
        genre: [],
        platform: [],
    });




    function handleSelectGenre(e) {
        const selectedGenre = e.target.value;
        // Verifico repetición:
        if (gameData.genre.includes(selectedGenre)) {
            console.log("repe");
            return;
        }
        console.log("NO repe");
        setGameData((prevInput) => ({
            ...prevInput,
            genre: [...prevInput.genre, selectedGenre],
        }));

        setErrors(validator({
            ...gameData,
            genre: [...gameData.genre, selectedGenre],
        }));
    }

    function handleSelectPlatform(e) {
        const selectedPlatform = e.target.value

        // Verifico si la plataforma ya está presente en el array
        if (gameData.platform.includes(selectedPlatform)) {
            return; // No se realiza ninguna acción si ya está presente
        }
        setGameData((prevInput) => ({
            ...prevInput,
            platform: [...prevInput.platform, selectedPlatform],
        }));

        setErrors(validator({
            ...gameData,
            platform: [...gameData.platform, selectedPlatform],
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


    function handleChange(e) {
        setGameData({
            ...gameData,
            [e.target.name]: e.target.value
        })

        setErrors(validator({
            ...gameData,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formErrors = validator(gameData);
        setErrors(formErrors);

        // Verificar si existen errores
        if (Object.keys(formErrors).length === 0) {

            dispatch(postVidegame(gameData));

            //alert('Game created');
            setGameData({
                name: "",
                description: "",
                image: "",
                released_date: "",
                rating: "",
                genre: [],
                platform: [],
            });
            // busco todos los reg de nuevo:
            // Preparo el store para que cargue home nuevamente, pero esta vez con opción de
            // filtrado y origen de búsqueda:
            dispatch(setNombreBusqueda(''));
            dispatch(setCurrPage('1')); // siempre inicia en página 1 la búsqueda
            //console.log("GUARDO ORIGEN BUSQUEDA 3 de prepo")
            dispatch(setCurrOrigin('All')); // le aviso a Filter que empiece por todos los orígenes
            dispatch(setOrigenBusqueda('3'));
            dispatch(setDataLoaded(false)); // obligo a home a refrescar datos
            dispatch(setRefreshHome()); // obligo a home a refrescar datos
            navigate(HOME);
        }
    }




    return (
        <form className={container} onSubmit={handleSubmit}>
            <div className={container}>
                <label htmlFor="name">Name:</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={gameData.name}
                    onChange={handleChange}
                    id="name"
                />
                <p className={container}>{errors.name}</p>
            </div>

            <div className={container}>
                <label htmlFor="description">description:</label>
                <input
                    name="description"
                    type="text"
                    placeholder="Description"
                    value={gameData.description}
                    onChange={handleChange}
                    id="description"
                />
                <p className={container}>{errors.description}</p>
            </div>
            <div className={container}>
                <label htmlFor="image">image:</label>
                <input
                    name="image"
                    type="text"
                    placeholder="Image link"
                    value={gameData.image}
                    onChange={handleChange}
                    id="image"
                />
                <p className={container}>{errors.image}</p>
            </div>
            <div className={container}>
                <label htmlFor="released">released:</label>
                <input
                    name="released"
                    type="text"
                    placeholder='Released (yyyy-mm-dd)'
                    value={gameData.released_date}
                    onChange={handleChange}
                    id="released"
                />
                <p className={container}>{errors.released_date}</p>
            </div>
            <div className={container}>
                <label htmlFor="rating">rating:</label>
                <input
                    name="rating"
                    type="number"
                    placeholder='Rating (1-10)'
                    value={gameData.rating}
                    onChange={handleChange}
                    id="rating"
                />
                <p className={container}>{errors.rating}</p>
            </div>

            <div className={container}>
                {/* Selección de géneros: */}
                <label className={container} htmlFor="genre">Genre/s</label>
                <select className={container}
                    name="genre"
                    multiple
                    value={gameData.genre}
                    onChange={handleSelectGenre}
                >
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <div className={container}>
                    Selected Genre/s::{" "}
                    {gameData.genre.map((genre) => (
                        <span key={genre}>
                            {` ${genre}`}
                            <button
                                className={container}
                                onClick={() => handleRemoveGenre(genre)}
                            >
                                X
                            </button>
                        </span>
                    ))}
                </div>

                <p className={container}>{errors.genre}</p>
            </div>
            <div className={container}>
                {/* Selección de plataformas: */}
                <label className={container} htmlFor="platform">Platform/s</label>
                <select className={container}
                    name="platform"
                    multiple
                    value={gameData.platform}
                    onChange={handleSelectPlatform}
                >
                    {platforms.map((plat) => (
                        <option key={plat.id} value={plat.name}>
                            {plat.name}
                        </option>
                    ))}
                </select>

                <div className={container}>
                    Selected Platform/s::{" "}
                    {gameData.platform.map((platform) => (
                        <span key={platform}>
                            {` ${platform}`}
                            <button
                                className={container}
                                onClick={() => handleRemovePlatform(platform)}
                            >
                                X
                            </button>
                        </span>
                    ))}
                </div>

                <p className={container}>{errors.platform}</p>
            </div>



            <p className={container} href="/">
                <button className={container} type="submit">Create game!</button>
            </p>
        </form >
    )
}

export default Create;
