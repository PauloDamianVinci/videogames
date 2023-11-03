// hooks, routers, reducers:
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeCard } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { paginacionPendiente } from "../../redux/actions";

// Variables de entorno:
const DETAIL_BASE = import.meta.env.VITE_DETAIL_BASE || '/detail';
const IMG_ERROR = import.meta.env.VITE_IMG_ERR_DETAIL || '/src/assets/NoPhoto.png';
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';

// Estilos:
import style from "./Card.module.css";
const { buttonRemove, container, containerImg, img, contButton, button, containerFeatures, featuresCardName, featuresCardGenre } = style;

const Card = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id, name, image, genresV, rating, aux, setAux } = props;
    const [isLoading, setIsLoading] = useState(true);
    const linkDetail = `${DETAIL_BASE}/${id}`;
    const [genreList, setGenreList] = useState('');
    const [imgShow, setImgShow] = useState(IMG_ESPERA);
    const [nameShow, setNameShow] = useState('Not found');
    const [ratingShow, setRatingShow] = useState('Not found');
    const [isBD, setIsBD] = useState(false);
    const [isHandling, setIsHandling] = useState(false);

    useEffect(() => {
        // Las listas se llenaron diferente según el origen. Las trato por separado:
        if (image) {
            // testeo el link de la imagen:
            const imageTest = new Image();
            imageTest.src = image;
            imageTest.onload = () => {
                setImgShow(imageTest.src);
            };
            imageTest.onerror = () => {
                setImgShow(IMG_ERROR);
            };
        };
        if (name) {
            setNameShow(name);
        };
        if (rating) {
            setRatingShow(rating);
        };
        setGenreList(genresV.map(genre => genre.name).join(' - '));

        // Permito borrar las cards de la DB:
        if (isNaN(id)) { // desde BD
            setIsBD(true);
        } else { // desde API
            setIsBD(false);
        }
        setIsLoading(false);
    }, []);

    const handleDelete = () => {
        if (isHandling) {
            console.log("OCUPADO");
            return;
        };
        setIsHandling(true);
        //console.log("id a remover: ", id);
        dispatch(removeCard(id));
        dispatch(paginacionPendiente(true)); // para conservar la página actual


        setAux(!aux);
        setIsHandling(false);
    };

    //console.log("CARD PAGE ", currentPage)
    return (
        <div className={container}>
            {isLoading ? (
                <div className={container}>
                    {/* <div clg className={img} src={IMG_ESPERA} alt="" /> */}
                </div >
            ) : name ? (
                <div className={container}>
                    <div className={containerImg}>
                        <img className={img} src={imgShow} alt="" />
                        {isBD ? (<button className={buttonRemove} onClick={handleDelete}>❌</button>) : (null)}
                    </div>
                    <div className={containerFeatures}>
                        <h2 className={featuresCardName}>{nameShow}</h2>
                        <h2 className={featuresCardGenre}>{genreList}</h2>
                        <div className={contButton}>
                            <button className={button} onClick={() => navigate(linkDetail)} >Details</button>
                        </div>
                    </div>
                </div>
            ) : null
            }
        </div >
    )
}

export default Card;