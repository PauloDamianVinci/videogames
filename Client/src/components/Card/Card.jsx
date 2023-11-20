// ! Componente de visualización de un videojuego. Llamado desde Cards.
// hooks, routers, reducers:
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCard, paginacionPendiente } from "../../redux/actions";
// Variables de entorno:
import useParamsEnv from "../../hooks/useParamsEnv.js";
const { DETAIL_BASE, EDIT_BASE, IMG_ERROR, IMG_ESPERA } = useParamsEnv();
// Estilos:
import style from "./Card.module.css";
const { buttonEdit, buttonRemove, container, containerImg, img, containerFeatures,
    featuresCardName, featuresCardGenre } = style;

const Card = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id, name, image, genresV, aux, setAux } = props;
    const [isLoading, setIsLoading] = useState(true);
    const linkDetail = `${DETAIL_BASE}/${id}`;
    const linkEdit = `${EDIT_BASE}/${id}`;
    const [genreList, setGenreList] = useState('');
    const [imgShow, setImgShow] = useState(IMG_ESPERA);
    const [nameShow, setNameShow] = useState('Not found');
    const [isBD, setIsBD] = useState(false);
    const [isHandling, setIsHandling] = useState(false);

    useEffect(() => {
        // Testeo el link de la imagen:
        if (image) {
            const imageTest = new Image();
            imageTest.src = image;
            imageTest.onload = () => { setImgShow(imageTest.src); };
            imageTest.onerror = () => { setImgShow(IMG_ERROR); };
        };
        if (name) {
            setNameShow(name);
        };
        setGenreList(genresV.map(genre => genre.name).join(' - '));
        // Permito borrar y editar las cards de la DB:
        if (isNaN(id)) { // desde BD
            setIsBD(true);
        } else { // desde API
            setIsBD(false);
        }
        setIsLoading(false);
    }, []);


    function endDelete() {
        setAux(!aux);
        setIsHandling(false);
    }

    const handleDelete = () => {
        if (isHandling) { return; };
        setIsHandling(true);
        dispatch(removeCard(id));
        dispatch(paginacionPendiente(true)); // para conservar la página actual en home
        // Establezco un pequeño tiempo de espera para que home pueda consultar el valor de allVideogames correctamente:
        setTimeout(endDelete, 500);
    };

    const handleEdit = () => {
        navigate(linkEdit);
    };

    return (
        <div className={container}>
            {isLoading ? (
                <div className={container}>
                    <div>...</div>
                </div >
            ) : name ? (
                <div className={container}>
                    <div className={containerImg}>
                        <img className={img} src={imgShow} onClick={() => navigate(linkDetail)} alt="" />
                        {isBD ? (<button className={buttonRemove} onClick={handleDelete}>❎</button>) : (null)}
                        {isBD ? (<button className={buttonEdit} onClick={handleEdit}>✅</button>) : (null)}
                    </div>
                    <div className={containerFeatures}>
                        <h2 className={featuresCardName} onClick={() => navigate(linkDetail)}>{nameShow} </h2>
                        <h2 className={featuresCardGenre} onClick={() => navigate(linkDetail)}>{genreList}</h2>
                    </div>
                </div>
            ) : null
            }
        </div >
    )

}

export default Card;