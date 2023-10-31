// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getPlatforms } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { setCurrRating, setCurrAZ, setCurrGenre, setFirstBusqueda, getGenres, setRefreshHome, postVidegame, setNombreBusqueda, setOrigenBusqueda, setDataLoaded, setCurrOrigin, setCurrPage } from "../../redux/actions";
// Funciones:
import validations from "./validations";
// Variables de entorno:
const HOME = import.meta.env.VITE_HOME || '/home';
// Estilos: 
import style from "./Create.module.css";
const { container, mainTitle, secondText, startButton, imgBack } = style;

const Create = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let genres = useSelector((state) => state.genres);
    let platforms = useSelector((state) => state.platforms);

    useEffect(() => {
        // Cargo las plataformas y géneros. Ya tengo los géneros desde antes.
        dispatch(getPlatforms());
        dispatch(getGenres());
    }, []);

    const [gameData, setGameData] = useState({
        name: "juego 0001",
        description: "desc juego 01",
        image: "https://res.cloudinary.com/dvptbowso/image/upload/v1698321837/PI_Videogames/sn7z4wl8vrz8wgh27cgj.jpg",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validations(gameData);
        setErrors(formErrors);
        if (Object.keys(formErrors).length !== 0) { return; }
        dispatch(postVidegame(gameData));

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
        dispatch(setCurrOrigin('True')); // le aviso a Filter que empiece por origen BD

        dispatch(setCurrAZ('')); // dejo de recordar los criterios de ordenamiento y filtro
        dispatch(setCurrGenre('All')); // dejo de recordar los criterios de ordenamiento y filtro
        dispatch(setCurrRating('')); // dejo de recordar los criterios de ordenamiento y filtro


        dispatch(setOrigenBusqueda('1')); // fuerzo a refrescar la BD solamente
        dispatch(setDataLoaded(false)); // obligo a home a refrescar datos
        dispatch(setRefreshHome()); // obligo a home a refrescar datos
        navigate(HOME);
        return;
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
                <span className={container}>{errors.name}</span>
            </div>

            <div className={container}>
                <label htmlFor="description">description:</label>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={gameData.description}
                    onChange={handleChange}
                    id="description"
                    maxLength="150"
                    rows="4"
                />
                <span className={container}>{errors.description}</span>
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
                <span className={container}>{errors.image}</span>
            </div>
            <div className={container}>
                <label htmlFor="released_date">released:</label>
                <input
                    name="released_date"
                    type="text"
                    placeholder='Released (yyyy-mm-dd)'
                    value={gameData.released_date}
                    onChange={handleChange}
                    id="released_date"
                />
                <span className={container}>{errors.released_date}</span>
            </div>
            <div className={container}>
                <label htmlFor="rating">rating:</label>
                <input
                    name="rating"
                    type="text"
                    placeholder='Rating (1-10)'
                    value={gameData.rating}
                    onChange={handleChange}
                    id="rating"
                />
                <span className={container}>{errors.rating}</span>
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
                    Selected Genre/s: {" "}
                    {gameData.genre.map((genre) => (
                        <span key={genre}>
                            {` ${genre}`}
                            <button
                                className={container}
                                onClick={() => handleRemoveGenre(genre)}
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>

                <span className={container}>{errors.genre}</span>
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
                    Selected Platform/s: {" "}
                    {gameData.platform.map((platform) => (
                        <span key={platform}>
                            {` ${platform}`}
                            <button
                                className={container}
                                onClick={() => handleRemovePlatform(platform)}
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>

                <span className={container}>{errors.platform}</span>
            </div>

            <div className={container}>
                <button className={startButton} onClick={() => navigate(-1)} >Don't wanna play</button>
            </div>


            <p className={container} href="/">
                <button className={container} type="submit">Create game!</button>
            </p>
        </form >
    )
}

export default Create;
