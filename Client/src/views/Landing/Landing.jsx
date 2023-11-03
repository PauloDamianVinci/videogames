// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
// Estilos:
import style from "./Landing.module.css";
const { container, mainTitle, secondText, img, contButton, button } = style;
// Variables de entorno:
const HOME = import.meta.env.VITE_HOME || '/home';
const LAND = import.meta.env.VITE_IMG_LAND || '/src/assets/Land.jpg';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className={container}>
            <img className={img} src={LAND} alt="" />
            <h1 className={mainTitle}>PI Video Games</h1>
            <h2 className={secondText}>Wanna play?</h2>
            <p className={contButton} href="/">
                <button className={button} onClick={() => navigate(HOME)} >Start</button>
            </p>
        </div >
    )
};

export default Landing;

