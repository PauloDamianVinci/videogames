// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
// Estilos:
import style from "./Landing.module.css";
const { container, mainTitle, secondText, startButton, imgBack } = style;
// Variables de entorno:
const HOME = import.meta.env.VITE_HOME || '/home';
const LAND = import.meta.env.VITE_IMG_LAND || '/src/assets/Land.jpg';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className={container}>
            <h1 className={mainTitle}>PI Video Games - Henry</h1>
            <h2 className={secondText}>Wanna play?</h2>
            <button className={startButton} onClick={() => navigate(HOME)} >Start</button>
            <img className={imgBack} src={LAND} alt="" />
        </div >
    )
};
export default Landing;

