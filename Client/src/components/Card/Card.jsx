// hooks, routers, reducers:
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Variables de entorno:
const DETAIL_BASE = import.meta.env.VITE_DETAIL_BASE || '/detail';
const IMG_ERROR = import.meta.env.VITE_IMG_ERR_DETAIL || '/src/assets/NoPhoto.png';

// Estilos:
import style from "./Card.module.css";
const { container, containerImg, img, contButton, button, containerFeatures, featuresCardName, featuresCardGenre } = style;

const Card = (props) => {
    const navigate = useNavigate()
    const { id, name, image, genresV, rating } = props;
    const [isLoading, setIsLoading] = useState(true);
    const linkDetail = `${DETAIL_BASE}/${id}`;
    const [genreList, setGenreList] = useState('');
    const [imgShow, setImgShow] = useState(IMG_ERROR);
    const [nameShow, setNameShow] = useState('Not found');
    const [ratingShow, setRatingShow] = useState('Not found');

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
        if (isNaN(id)) { // desde BD
            setGenreList(genresV.map(genre => genre.name).join(' - '));
        } else { //desde API
            setGenreList(genresV.map(genre => genre).join(" - "));
        }
        setIsLoading(false);
    }, []);


    return (
        <div className={container}>
            {isLoading ? (
                <div className={container}>
                    <h2>...</h2>
                </div>
            ) : genreList ? (
                <div className={container}>
                    <div className={containerImg}>
                        <img className={img} src={imgShow} alt="" />
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