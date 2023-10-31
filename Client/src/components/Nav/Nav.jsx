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
const { container, containerHidden, secondText, startButton, imgBack } = style;
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


        console.log("NOMBRE ", nombreBusqueda)
        if (nombreBusqueda) {
            window.alert("Not allowed: please clear search, then try again");
            return;
        } else {
            navigate(CREATE);
        }
    }


    //console.log("ocultarCreate-> ", ocultarCreate);
    return (
        <div className={container}>
            <img className={container} src={IMG_LOGO_NAV} alt="" />
            <button className={container} onClick={() => handleShowCreate()} >Create</button>
            <Search />
            <button className={container} onClick={() => navigate(ABOUT)} >About</button>
            <button className={container} onClick={handleExit}>Exit</button>
        </div >
    )
}

export default Nav;
