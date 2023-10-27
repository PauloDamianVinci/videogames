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
    const { id, name, image, genre } = props;
    const [isLoading, setIsLoading] = useState(true);
    const linkDetail = `${DETAIL_BASE}/${id}`;

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <div className={container}>
            {isLoading ? (
                <div>
                    {/* <img className={imgCargando} src={IMG_ESPERA} alt="" /> */}
                    <p>Loading..</p>
                </div>
            ) : id ? (
                <div className={container}>
                    <div className={containerImg}>
                        <img className={img} src={image} alt="" />
                        <button className={ButtMore} onClick={() => navigate(linkDetail)} >Details</button>
                        <div className={containerFeatures}>
                            <h2 className={featuresCard}>{id}</h2>
                            <h2 className={featuresCard}>{name}</h2>
                            <h2 className={featuresCard}>{genre}</h2>
                        </div>
                    </div>
                </div>
            ) : null
            }
        </div >
    )
}

export default Card;
