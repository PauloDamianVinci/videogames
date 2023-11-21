// ! Visualización de detalles de un videojuego.
import axios from 'axios';
// hooks, routers, reducers:
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { paginacionPendiente } from "../../redux/actions";
import { useDispatch } from "react-redux";
// Variables de entorno:
import getParamsEnv from "../../functions/getParamsEnv.js";
const { ERROR, IMG_ERROR, IMG_ESPERA, VG_VIDEOGAMES } = getParamsEnv();
// Estilos:
import style from "./Detail.module.css";
const { thirdText, container, img, imgWait, containerLoading, secondText, contButton, button, descripcion } = style;
// Funciones:
import getFormatDate from "../../functions/getFormatDate.js";

const Detail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("Not found");
    const [description, setDescription] = useState("Not found");
    const [released_date, setReleased_date] = useState("Not found");
    const [rating, setRating] = useState("Not found");
    const [originDB, setOriginDB] = useState("Not found");
    const [image, setImage] = useState("Not found");
    const [genreList, setGenreList] = useState("Not found");
    const [platformList, setPlatformList] = useState("Not found");

    if (!id) { navigate(`${ERROR}`); }; // mando al error en caso de que ingresen manualmente a esta dirección sin id


    useEffect(() => {
        setIsLoading(true);
        const endpoint = VG_VIDEOGAMES + "/" + id;
        axios(endpoint)
            .then(({ data }) => {
                if (data[0].name) {
                    // Obtengo los datos:
                    if (data[0].name) setName(data[0].name);
                    if (data[0].description) setDescription(data[0].description);
                    if (data[0].released_date) setReleased_date(getFormatDate(data[0].released_date));
                    if (data[0].rating) setRating(data[0].rating);
                    data[0].Genres.sort((a, b) => a.name.localeCompare(b.name));
                    setGenreList(data[0].Genres.map(genre => genre.name).join(" - "));
                    data[0].Platforms.sort((a, b) => a.name.localeCompare(b.name));
                    setPlatformList(data[0].Platforms.map(plat => plat.name).join(" - "));
                    data[0].OriginDB ? setOriginDB("Database") : setOriginDB("API");
                    // Testeo el link de la imagen:
                    if (data[0].image) {
                        const imageTest = new Image();
                        imageTest.src = data[0].image;
                        imageTest.onload = () => { setImage(imageTest.src); };
                        imageTest.onerror = () => { setImage(IMG_ERROR); };
                    }
                } else {
                    window.alert('Detail not found');
                }
            })
            .finally(() => {
                dispatch(paginacionPendiente(true)); // para conservar la página actual en home
                setIsLoading(false);
            })
            .catch((error) => {
                setName(error.message);
                setImage(IMG_ERROR);
            });
    }, []);

    function handleBack() {
        setName('');
        setDescription('');
        setReleased_date('');
        setRating('');
        setOriginDB('');
        setGenreList('');
        setPlatformList('');
        navigate(-1);
    }

    if (isLoading) {
        return (
            <div className={containerLoading}>
                <img className={imgWait} src={IMG_ESPERA} alt="" />
            </div >
        );
    } else {
        return (
            <div className={container}>
                <img className={img} src={image} alt="" />
                <h2 className={thirdText}>ID {id}</h2>
                <h2 className={thirdText}>{name}</h2>
                <h2 className={thirdText}>Rating (0-10): {rating}</h2>
                <h2 className={thirdText}>Released date: {released_date}</h2>
                <h2 className={descripcion}>{description}</h2>
                <h2 className={secondText}>Source: {originDB}</h2>
                <h3 className={secondText}>Genres: {genreList}</h3>
                <h3 className={secondText}>Platforms: {platformList}</h3>
                <div className={contButton}>
                    <button className={button} onClick={() => handleBack()}>Back</button>
                </div>
            </div>
        );
    }
}

export default Detail;