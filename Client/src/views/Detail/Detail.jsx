// hooks, routers, reducers:
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVideogameById, clearDetails } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// Variables de entorno:
const ERROR = import.meta.env.VITE_ERROR || '/error';
const IMG_ERROR = import.meta.env.VITE_IMG_ERR_DETAIL || '/src/assets/NoPhoto.png';
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';
// Estilos:
import style from "./Detail.module.css";
const { container, imgBack, img, features, featuresCard, ButtMore } = style;
// Funciones:
import formatDate from "../../functions/formatDate";
//import testLinkImage from "../../functions/testLinkImage";

const Detail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [imgShow, setImgShow] = useState(IMG_ERROR);
    const { id } = useParams();
    let name = "";
    let description = "Not found";
    let released_date = "Not found";
    let rating = "Not found";
    let Genres = {};
    let Platforms = {};
    let OriginDB = "Not found";
    let genreList = "Not found";
    let platformList = "Not found";
    if (!id) { navigate(`${ERROR}`); }; // mando al error en caso de que ingresen manualmente a esta dirección sin id
    let detail = useSelector((state) => state.detail); // tengo en el store todos los video juegos

    useEffect(() => {
        setIsLoading(true);
        dispatch(getVideogameById(id));
        setIsLoading(false);
        return () => {
            dispatch(clearDetails()) // limpio la posible consulta previa
        }
    }, []);

    if (detail.length > 0) {
        if (detail[0].name) name = detail[0].name;
        if (detail[0].description) description = detail[0].description;
        if (detail[0].image) {
            // testeo el link de la imagen:
            const imageTest = new Image();
            imageTest.src = detail[0].image;
            imageTest.onload = () => {
                setImgShow(imageTest.src);
            };
            imageTest.onerror = () => {
                setImgShow(IMG_ERROR);
            };
        }
        if (detail[0].rating) rating = detail[0].rating;
        Genres = detail[0].Genres;
        Platforms = detail[0].Platforms;
        detail[0].OriginDB ? OriginDB = "Database" : OriginDB = "API";
        released_date = formatDate(detail[0].released_date);
        // Las listas y fecha se llenaron diferente según el origen. Las trato por separado:
        if (isNaN(id)) { // desde BD
            genreList = Genres.map(genre => genre.name).join(' - ');
            platformList = Platforms.map(platform => platform.name).join(', ');
        } else { //desde API
            genreList = Genres.map(genre => genre).join(" - ");
            platformList = Platforms.map(plat => plat).join(" - ");
        }
    }

    // PASAR A INGLES

    return (
        <div className={container}>
            {isLoading ? (
                <div className={container}>
                    <img className={container} src={IMG_ESPERA} alt="" />
                </div>
            ) : name ? (
                <div className={container}>
                    <img className={imgBack} src={imgShow} alt="" />
                    <h2 className={features}>{name}</h2>
                    <h2 className={features}>ID {id}</h2>
                    <h2 className={features}>Source: {OriginDB}</h2>
                    <h2 className={features}>{description}</h2>
                    <h2 className={features}>Released date: {released_date}</h2>
                    <h2 className={features}>Rating: {rating}</h2>
                    <h3 className={features}>Genres: {genreList}</h3>
                    <h3 className={features}>Platforms: {platformList}</h3>
                    <button className={features} onClick={() => navigate(-1)}>Back</button>
                </div>
            ) : null}
        </div>
    );
}

export default Detail;