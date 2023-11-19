// ! Muestra y maneja los campos de edición y creación de videojuego.
// hooks, routers, reducers:
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// Funciones:
import validations from "../../functions/validations";
import orderArray from "../../functions/orderArray";
// Variables de entorno:
import useParamsEnv from "../../hooks/useParamsEnv.js";
const { IMG_HELP } = useParamsEnv();
// Estilos: 
import style from "./VideogameFields.module.css";
const { labelTitle, containerSelect, mainTextErrorRating, mainTextRating, mainTextError, label,
    contButtonShort, selectCombo, mainText, container, contButton, button, containerData, errorsCreate } = style;

const VideogameFields = (props) => {
    const { gameData, setGameData, errors, setErrors } = props;
    const [esEdit, setEsEdit] = useState(false);
    //Obtengo géneros y plataformas, los ordeno alfabéticamente:
    let genres = useSelector((state) => state?.genres);
    let genresOrdered = orderArray(genres);
    let platforms = useSelector((state) => state?.platforms);
    let platformsOrdered = orderArray(platforms);

    useEffect(() => {
        if (gameData.name) {
            setEsEdit(true);
        }
    }, []);

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
        <div className={container}>
            <div className={containerData}>
                <input className={`${errors.name ? mainTextError : mainText}`}
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={gameData.name}
                    onChange={handleChange}
                    id="name"
                    autoComplete="name"
                    disabled={esEdit}
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
        </div >
    )
};

export default VideogameFields;
