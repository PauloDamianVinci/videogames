// ! Creación de videojuego.
import axios from 'axios';
// Componentes:
import VideogameFields from "../../components/VideogameFields/VideogameFields.jsx";
// hooks, routers, reducers:
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postVidegame, paginacionPendiente, resetFilterAndOrder } from "../../redux/actions";
// Funciones:
import getValidations from "../../functions/getValidations.js";
// Variables de entorno:
import getParamsEnv from "../../functions/getParamsEnv.js";
const { VG_VIDEOGAMES } = getParamsEnv();
// Estilos: 
import style from "./Create.module.css";
const { container, contButton, button, containerFields, containerTitle } = style;

const Create = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        const formErrors = getValidations(gameData);
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

    return (
        <form onSubmit={handleSubmit}>
            <div className={container} >
                <h2 className={containerTitle}>Let's create a game!</h2>
                <div className={containerFields}>
                    < VideogameFields gameData={gameData} setGameData={setGameData} errors={errors} setErrors={setErrors} />
                </div >
                <p className={contButton} href="/">
                    <button className={button} type="submit" >
                        Create game!
                    </button>
                </p>
                <div className={contButton}>
                    <button className={button} onClick={() => handleBack()} >Don't wanna play anymore</button>
                </div>
            </div>
        </form >
    )
};

export default Create;
