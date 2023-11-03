// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { resetAll } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// Estilos:
import style from "./Error.module.css";
const { container, mainTitle, secondText, img, contButton, button } = style;
// Variables de entorno:
const IMG_404 = import.meta.env.VITE_IMG_404 || '/src/assets/Error404.jpeg';
const IMG_ERROR = import.meta.env.VITE_IMG_ERROR || '/src/assets/Error.jpeg';
const ROOT = import.meta.env.VITE_ROOT || '/';

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
