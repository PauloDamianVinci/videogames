// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setNombreBusqueda, setOrigenBusqueda, resetFilterOrder, setDataLoaded } from "../../redux/actions";
// Estilos:
import style from "./Nav.module.css";
const { container, mainTitle, secondText, startButton, imgBack } = style;
// Variables de entorno:
const CREATE = import.meta.env.VITE_CREATE || '/create';
const ABOUT = import.meta.env.VITE_ABOUT || '/about';
const ROOT = import.meta.env.VITE_ROOT || '/';
const HOME = import.meta.env.VITE_HOME || '/home';
const IMG_LOGO_NAV = import.meta.env.VITE_IMG_LOGO_NAV || '/src/assets/ImgNav.jpeg';

const Nav = (props) => {
    const { refresh, setRefresh } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [origin, setOrigin] = useState('All')
    const [selectedOrigin, setSelectedOrigin] = useState('All');

    const handleSearch = () => {
        // Valido el texto a buscar:
        if (!name) {
            window.alert("Name missing");
            return;
        };
        console.log("Preparo dispach...");
        // Preparo el store para que cargue home nuevamente, pero esta vez con opción de
        // filtrado y origen de búsqueda:
        dispatch(setNombreBusqueda(name));
        dispatch(setOrigenBusqueda(origin));
        dispatch(setDataLoaded(false)); // obligo a home a refrescar datos
        console.log("Cargo home...");
        setRefresh(!refresh);
        navigate(HOME);
        return;
    }

    const handleExit = () => {
        dispatch(resetFilterOrder());
        navigate(ROOT);
    }

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleOriginData(e) {
        switch (e.target.value) {
            case 'All':
                setOrigin('3'); // ambos
                console.log("e.target.value->all");
                break;
            case 'False':
                setOrigin('2'); // api
                console.log("e.target.value->API");
                break;
            case 'True':
                setOrigin('1'); // db
                console.log("e.target.value->DB");
                break;
            default:
        }
        setSelectedOrigin(e.target.value);
    }

    return (
        <div className={container}>
            <img className={container} src={IMG_LOGO_NAV} alt="" />
            <button className={container} onClick={() => navigate(CREATE)} >Create</button>
            <div className={container}>
                <h2 className={container}>Origin</h2>
                <select onChange={handleOriginData} value={selectedOrigin}>
                    <option value="All">All</option>
                    <option value="False">Api</option>
                    <option value="True">Database</option>
                </select>
            </div>
            <input
                type="text"
                placeholder="Search by name..."
                value={name}
                onChange={handleInputChange}
                id="name"
            />
            <button className={container} onClick={() => { handleSearch(); }}>Search</button>
            <button className={container} onClick={() => navigate(ABOUT)} >About</button>
            <button className={container} onClick={() => { handleExit(); }}>Exit</button>
        </div >
    )
}

export default Nav;
