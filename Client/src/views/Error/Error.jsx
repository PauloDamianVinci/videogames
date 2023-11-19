// ! Esta vista sirve para mostrar errores generales y también para el error 404 al cargar una página errónea.
// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { resetAll } from "../../redux/actions";
import { useDispatch } from "react-redux";
// Estilos:
import style from "./Error.module.css";
const { container, mainTitle, secondText, img, contButton, button } = style;
// Variables de entorno:
import useParamsEnv from "../../hooks/useParamsEnv.js";
const { IMG_404, IMG_ERROR, ROOT } = useParamsEnv();

const Error = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = props;

    let imgShow = '';
    if (message) {
        imgShow = IMG_ERROR;
    } else {
        imgShow = IMG_404;
    }

    function handleOriginData() {
        dispatch(resetAll());
        navigate(ROOT);
    }

    return (
        <div className={container}>
            <h1 className={mainTitle}>GAME OVER</h1>
            <img className={img} src={imgShow} alt="" />
            <h2 className={secondText}>{message}</h2>
            <p className={contButton} href="/">
                <button className={button} onClick={() => handleOriginData()} >Restart</button>
            </p>
        </div >
    )

}

export default Error;
