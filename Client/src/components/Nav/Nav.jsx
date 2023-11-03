// ! Componente de navegación. Se muestra arriba de la página. Incluye al componente Search. Llamado desde Home.
// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAll } from "../../redux/actions";
// Componentes:
import Search from "../../components/Search/Search.jsx";
// Estilos:
import style from "./Nav.module.css";
const { container, containerSec, containerImg, img, contButton, button, mainTitle } = style;

// Variables de entorno:
const CREATE = import.meta.env.VITE_CREATE || '/create';
const ABOUT = import.meta.env.VITE_ABOUT || '/about';
const ROOT = import.meta.env.VITE_ROOT || '/';
const IMG_LOGO_NAV = import.meta.env.VITE_IMG_LOGO_NAV || '/src/assets/ImgNav.jpeg';

const Nav = (props) => {
    const { aux, setAux } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleExit = () => {
        // Salgo al landing. Restablezco el store antes:
        dispatch(resetAll());
        navigate(ROOT);
    }

    function handleShowCreate() {
        navigate(CREATE);
    }

    return (
        <div className={container}>
            <div className={containerImg}>
                <h1 className={mainTitle}>PI Video Games</h1>
                <img className={img} src={IMG_LOGO_NAV} alt="" />
            </div>
            <div className={containerSec}>
                <p className={contButton}>
                    <button className={button} onClick={() => handleShowCreate()} >Create</button>
                </p>
                <p className={contButton}>
                    <button className={button} onClick={() => navigate(ABOUT)} >About</button>
                </p>
                <p className={contButton}>
                    <button className={button} onClick={handleExit}>Exit</button>
                </p>
            </div>
            <Search aux={aux} setAux={setAux} />
        </div >
    )
}

export default Nav;
