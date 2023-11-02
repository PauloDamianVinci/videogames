import axios from 'axios';
// hooks, routers, reducers:
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVideogameById, clearDetails } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// Variables de entorno:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const ERROR = import.meta.env.VITE_ERROR || '/error';
const IMG_ERROR = import.meta.env.VITE_IMG_ERR_DETAIL || '/src/assets/NoPhoto.png';
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';
const VG_V = import.meta.env.VITE_VG_VIDEOGAMES || '/videogames';
const VG_VIDEOGAMES = API_URL_BASE + VG_V;
// Estilos:
import style from "./Detail.module.css";
const { containerData, separador, thirdText, container, img, imgWait, containerSec, containerImg, containerMainTitle, secondText, contButton, button, descripcion } = style;
// Funciones:
//import formatDate from "../../functions/formatDate";

const Detail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [name, setName] = useState("Not found");
    const [description, setDescription] = useState("Not found");
    const [released_date, setReleased_date] = useState("Not found");
    const [rating, setRating] = useState("Not found");
    const [originDB, setOriginDB] = useState("Not found");
    const [image, setImage] = useState("Not found");
    const [genreList, setGenreList] = useState("Not found");
    const [platformList, setPlatformList] = useState("Not found");
    const [genres, setGenres] = useState({});
    const [platforms, setPlatforms] = useState({});

    if (!id) { navigate(`${ERROR}`); }; // mando al error en caso de que ingresen manualmente a esta dirección sin id

    useEffect(() => {
        setIsLoading(true);
        const endpoint = VG_VIDEOGAMES + "/" + id;
        //const varrta=dispatch(getVideogameById(id));
        axios(endpoint)
            .then(({ data }) => {
                //console.log(data);
                if (data[0].name) {
                    // Obtengo los datos:
                    if (data[0].name) setName(data[0].name);
                    if (data[0].description) setDescription(data[0].description);
                    if (data[0].released_date) setReleased_date(data[0].released_date);
                    if (data[0].rating) setRating(data[0].rating);
                    // La lista de géneros y plataformas se arma diferente según el origen:
                    // console.log("GEN: ", data[0].Genres)
                    // console.log("PLT: ", data[0].Platforms)
                    if (isNaN(id)) { // desde BD
                        //console.log("BD");
                        setGenreList(data[0].Genres.map(genre => genre.name).join(" - "));
                        setPlatformList(data[0].Platforms.map(plat => plat.name).join(" - "));
                    } else { //desde API
                        //console.log("API");
                        setGenreList(data[0].Genres.map(genre => genre).join(" - "));
                        setPlatformList(data[0].Platforms.map(plat => plat).join(" - "));
                    }
                    // Adapto el dato origen:
                    data[0].OriginDB ? setOriginDB("Database") : setOriginDB("API");
                    // Testeo el link de la imagen:
                    if (data[0].image) {
                        // Testeo el link de la imagen:
                        const imageTest = new Image();
                        imageTest.src = data[0].image;
                        imageTest.onload = () => {
                            setImage(imageTest.src);
                        };
                        imageTest.onerror = () => {
                            setImage(IMG_ERROR);
                        };
                    }
                } else {
                    window.alert('Detail not found');
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                setName(error.message);
                setImage(IMG_ERROR);
            });

        return () => {
            dispatch(clearDetails()) // limpio la posible consulta previa
        }
    }, []);

    function handleBack() {
        navigate(-1);
    }

    return (
        <div className={container}>
            {isLoading ? (
                <div className={containerSec}>
                    <img className={imgWait} src={IMG_ESPERA} alt="" />
                </div >
            ) : name ? (
                <div className={containerData}>
                    <div className={containerImg}>
                        <img className={img} src={image} alt="" />
                    </div>
                    <div className={containerMainTitle}>
                        <h2 className={thirdText}>ID {id}</h2>
                        <span className={separador}></span>
                        <h2 className={thirdText}>{name}</h2>
                        <span className={separador}></span>
                        <h2 className={thirdText}>Rating (0-10): {rating}</h2>
                    </div>
                    <span className={separador}></span>
                    <h2 className={secondText}>Released date: {released_date}</h2>
                    <span className={separador}></span>
                    <h2 className={descripcion}>{description}</h2>
                    <span className={separador}></span>
                    <h2 className={secondText}>Source: {originDB}</h2>
                    <span className={separador}></span>
                    <h3 className={secondText}>Genres: {genreList}</h3>
                    <span className={separador}></span>
                    <h3 className={secondText}>Platforms: {platformList}</h3>
                    <div className={contButton}>
                        <button className={button} onClick={() => handleBack()}>Back</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Detail;