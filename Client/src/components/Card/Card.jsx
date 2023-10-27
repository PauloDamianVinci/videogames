// hooks, routers, reducers:
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Variables de entorno:
const DETAIL_BASE = import.meta.env.VITE_DETAIL_BASE || '/detail';
// Estilos:
import style from "./Card.module.css";
const { container, containerImg, img, containerFeatures, featuresCard, ButtMore } = style;

const Card = (props) => {
    const navigate = useNavigate()
    const { id, name, image, genresV, rating } = props;
    const [isLoading, setIsLoading] = useState(true);
    const linkDetail = `${DETAIL_BASE}/${id}`;
    const [genreList, setGenreList] = useState('');

    useEffect(() => {
        // Las listas se llenaron diferente según el origen. Las trato por separado:
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
                <div>
                    {/* <img className={imgCargando} src={IMG_ESPERA} alt="" /> */}
                    <p>Loading..</p>
                </div>
            ) : genreList ? (
                <div className={container}>
                    <div className={containerImg}>
                        <img className={img} src={image} alt="" />
                        <button className={ButtMore} onClick={() => navigate(linkDetail)} >Details</button>
                        <div className={containerFeatures}>
                            <h2 className={featuresCard}>ID: {id}</h2>
                            <h2 className={featuresCard}>Nombre: {name}</h2>
                            <h2 className={featuresCard}>Gén: {genreList}</h2>
                            <h2 className={featuresCard}>Rating: {rating}</h2>
                        </div>
                    </div>
                </div>
            ) : null
            }
        </div >
    )
}

export default Card;
