// ! Edición de videojuego.
import axios from 'axios';
// Componentes:
import VideogameFields from "../../components/VideogameFields/VideogameFields.jsx";
// hooks, routers, reducers:
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editVidegame, paginacionPendiente } from "../../redux/actions";
// Funciones:
import validations from "../../functions/validations";
import formatDate from "../../functions/formatDate";
// Variables de entorno:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const VG_V = import.meta.env.VITE_VG_VIDEOGAMES || '/videogames';
const VG_VIDEOGAMES = API_URL_BASE + VG_V;
const ERROR = import.meta.env.VITE_ERROR || '/error';
const VG_E = import.meta.env.VITE_VG_EDIT || '/edit';
const VG_EDIT_GAME = API_URL_BASE + VG_E;
// Estilos: 
import style from "./Edit.module.css";
const { container, contButton, button, containerFields, containerTitle } = style;

const Edit = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
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

    if (!id) { navigate(`${ERROR}`); }; // mando al error en caso de que ingresen manualmente a esta dirección sin id

    //Obtengo los datos del videojuego:
    useEffect(() => {
        setIsLoading(true);
        const endpoint = VG_VIDEOGAMES + "/" + id;
        axios(endpoint)
            .then(({ data }) => {
                if (data[0].name) {
                    setGameData({
                        name: data[0].name,
                        description: data[0].description,
                        image: data[0].image,
                        released_date: formatDate(data[0].released_date),
                        rating: data[0].rating,
                        genre: data[0].Genres.map(genre => genre.name),
                        platform: data[0].Platforms.map(plat => plat.name),
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                window.alert(`Couldn't fetch data`);
            });
    }, []);

    const handleEdit = async () => {
        const formErrors = validations(gameData);
        setErrors(formErrors);
        if (Object.keys(formErrors).length !== 0) {
            return;
        }
        const endpoint = VG_EDIT_GAME + "/" + id;
        const { data } = axios.put(endpoint, gameData)
            .then(({ data }) => {
                const aux = {
                    id: id,
                    name: gameData.name,
                    image: gameData.image,
                    description: gameData.description,
                    released_date: gameData.released_date,
                    rating: gameData.rating,
                    Platforms: gameData.platform && gameData.platform.map(el => ({ name: el })),
                    Genres: gameData.genre && gameData.genre.map(el => ({ name: el })),
                    OriginDB: true,
                }
                dispatch(editVidegame(aux)); // actualizo el store con el nuevo registro
                setGameData({
                    name: "",
                    description: "",
                    image: "",
                    released_date: "",
                    rating: "",
                    genre: [],
                    platform: [],
                });
                dispatch(paginacionPendiente(true)); // para conservar la página actual en home
                navigate(-1);
                window.alert("Game saved!");
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
        // Regreso a la pantalla principal:
        dispatch(paginacionPendiente(true)); // para conservar la página actual en home
        navigate(-1);
    }

    if (!isLoading) {
        return (
            <div className={container} >
                <h2 className={containerTitle}>Let's edit the game!</h2>
                <div className={containerFields}>
                    < VideogameFields gameData={gameData} setGameData={setGameData} errors={errors} setErrors={setErrors} />
                </div >
                <p className={contButton} href="/">
                    <button className={button} onClick={() => handleEdit()} >
                        Save game!
                    </button>
                </p>
                <div className={contButton}>
                    <button className={button} onClick={() => handleBack()} >Get me out of here</button>
                </div>
            </div >
        )
    }
};

export default Edit;
