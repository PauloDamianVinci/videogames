// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearDetails, resetFilterAndOrder, setCurrRating, setCurrAZ, setCurrGenre, getGenres, setRefreshHome, postVidegame, setNombreBusqueda, setOrigenBusqueda, setCurrOrigin, setCurrPage } from "../../redux/actions";
// Funciones:
import validations from "./validations";
import orderArray from "../../functions/orderArray";
// Variables de entorno:
const IMG_HELP = import.meta.env.VITE_IMG_ABOUT || '/src/assets/Face.jpg';
// Variables de entorno:
const IMG_LOGO_NAV = import.meta.env.VITE_IMG_LOGO_NAV || '/src/assets/ImgNav.jpeg';

// Estilos: 
import style from "./Create.module.css";
const { containerImg, img, linkText, ratingText, dateText, label, contButtonShort, selectCombo, mainText, container, contButton, button, containerData, errorsCreate } = style;

const Create = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Obtengo géneros y plataformas, los ordeno alfabéticamente:
    let genres = useSelector((state) => state.genres);
    let genresOrdered = orderArray(genres);
    let platforms = useSelector((state) => state.platforms);
    let platformsOrdered = orderArray(platforms);
    // Obtengo los posibles errores:
    let errorCreate = useSelector((state) => state.errors);
    const [huboAlta, setHuboAlta] = useState(false);

    // LIMPIAR ESOS ESTADOS!!!!
    const [gameData, setGameData] = useState({
        name: "juego 0001",
        description: "desc juego 01",
        image: "https://res.cloudinary.com/dvptbowso/image/upload/v1698321837/PI_Videogames/sn7z4wl8vrz8wgh27cgj.jpg",
        released_date: "2020-01-01",
        rating: "2",
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
        dispatch(postVidegame(gameData));


        console.log("2");

        if (errorCreate) {
            console.log("ERRRR");
            window.alert("Error: ", errorCreate);
        } else {
            setHuboAlta(true);
            window.alert("Game created!");
        }
        // PROBAR QUE HOME MUESTRE EL ERROR SIEMPRE
        setGameData({
            name: "",
            description: "",
            image: "",
            released_date: "",
            rating: "",
            genre: [],
            platform: [],
        });
    }

    function handleBack() {
        // Regreso a la pantalla principal, pero limpio filtros porque agregué nuevos datos
        // y merecen ser ordenados desde cero:
        if (huboAlta) {
            dispatch(resetFilterAndOrder());
        } else {
            dispatch(clearDetails()); // limpio la posible consulta previa
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


            <div className={containerImg}>
                <h2 className={containerData}>Let's create!</h2>
                <img className={img} src={IMG_LOGO_NAV} alt="" />
            </div>




            <div className={containerData}>
                <label className={label} htmlFor="name">Name:</label>
                <input className={mainText}
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={gameData.name}
                    onChange={handleChange}
                    id="name"
                />
                <span className={errorsCreate}>{errors.name}</span>
            </div>

            <div className={containerData}>
                <label className={label} htmlFor="description">Description:</label>
                <textarea className={mainText}
                    name="description"
                    placeholder="Description"
                    value={gameData.description}
                    onChange={handleChange}
                    id="description"
                    maxLength="150"
                    rows="4"
                />
                <span className={errorsCreate}>{errors.description}</span>
            </div>
            <div className={containerData}>
                <label className={label} htmlFor="image">Image:</label>
                <input className={linkText}
                    name="image"
                    type="text"
                    placeholder="link"
                    value={gameData.image}
                    onChange={handleChange}
                    id="image"
                />
                <span className={errorsCreate}>{errors.image}</span>

                <div className={contButton}>
                    <button className={button} onClick={() => handlePasteLink()} >Please, give me a link</button>
                </div>


            </div>
            <div className={containerData}>
                <label className={label} htmlFor="released_date">Released date:</label>
                <input className={dateText}
                    name="released_date"
                    type="text"
                    placeholder='(yyyy-mm-dd)'
                    value={gameData.released_date}
                    onChange={handleChange}
                    id="released_date"
                />
                <span className={errorsCreate}>{errors.released_date}</span>
            </div>
            <div className={containerData}>
                <label className={label} htmlFor="rating">Rating:</label>
                <input className={ratingText}
                    name="rating"
                    type="text"
                    placeholder='(1-10)'
                    value={gameData.rating}
                    onChange={handleChange}
                    id="rating"
                />
                <span className={errorsCreate}>{errors.rating}</span>
            </div>

            <div className={containerData}>
                {/* Selección de géneros: */}
                <label className={label} htmlFor="genre">Genre/s</label>
                <select className={selectCombo}
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

                <div className={label}>
                    Selected Genre/s: {" "}
                    {gameData.genre.map((genre) => (
                        <span key={genre}>
                            {` ${genre}`}
                            <button className={contButtonShort} onClick={() => handleRemoveGenre(genre)}>x</button>
                        </span>
                    ))}
                </div>

                <span className={errorsCreate}>{errors.genre}</span>
            </div>
            <div className={containerData}>
                {/* Selección de plataformas: */}
                <label className={label} htmlFor="platform">Platform/s</label>
                <select className={selectCombo}
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

                <div className={label}>
                    Selected Platform/s: {" "}
                    {gameData.platform.map((platform) => (
                        <span key={platform}>
                            {` ${platform}`}
                            <button className={contButtonShort} onClick={() => handleRemovePlatform(platform)}>x</button>
                        </span>
                    ))}
                </div>

                <span className={errorsCreate}>{errors.platform}</span>
            </div>





            <p className={contButton} href="/">
                <button className={button} type="submit">Create game!</button>
            </p>

            <div className={contButton}>
                <button className={button} onClick={() => handleBack()} >Don't wanna play anymore</button>
            </div>


        </form >
    )

};

export default Create;
