// ! Vista inicial del programa.
// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
// Estilos:
import style from "./Landing.module.css";
const { container, containerImg, mainTitle, secondText, img, contButton, button } = style;
// Variables de entorno:
import useParamsEnv from "../../hooks/useParamsEnv.js";
const { HOME, LAND } = useParamsEnv();

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className={container}>
            <div className={containerImg}>
                <img className={img} src={LAND} alt="" />
            </div>
            <h1 className={mainTitle}>PI Video Games</h1>
            <h2 className={secondText}>Wanna play?</h2>
            <p className={contButton} href="/">
                <button className={button} onClick={() => navigate(HOME)} >Start</button>
            </p>
        </div >
    )
};

export default Landing;

