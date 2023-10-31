// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { resetAll } from "../../redux/actions";
// Componentes:
import Search from "../../components/Search/Search";
// Estilos:
import style from "./Nav.module.css";
const { container, containerSec, containerImg, img, contButton, button, mainTitle } = style;
// Variables de entorno:
const CREATE = import.meta.env.VITE_CREATE || '/create';
const ABOUT = import.meta.env.VITE_ABOUT || '/about';
const ROOT = import.meta.env.VITE_ROOT || '/';
const IMG_LOGO_NAV = import.meta.env.VITE_IMG_LOGO_NAV || '/src/assets/ImgNav.jpeg';

const Nav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let nombreBusqueda = useSelector((state) => state.nombreBusqueda);

    const handleExit = () => {
        // Salgo al landing. Borro todo antes:
        dispatch(resetAll());
        navigate(ROOT);
    }

    function handleShowCreate() {
        // Permito ir al alta de video juego solamente si no estoy dentro de una búsqueda por nombre:
        if (nombreBusqueda) {
            window.alert("Not allowed: please clear search, then try again");
            return;
        } else {
            navigate(CREATE);
        }
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
            <Search />
        </div >
    )
}

export default Nav;
