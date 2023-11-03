// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { clearFilterByName, filterVideogamesByName, setOrigenBusqueda, resetAll, setCurrPage } from "../../redux/actions";
// Estilos:
import style from "./Search.module.css";
const { input, container, containerSec, containerHidden, contButton, button, mainTitle } = style;
// Variables de entorno:
const CREATE = import.meta.env.VITE_CREATE || '/create';
const ABOUT = import.meta.env.VITE_ABOUT || '/about';
const ROOT = import.meta.env.VITE_ROOT || '/';
const HOME = import.meta.env.VITE_HOME || '/home';
const IMG_LOGO_NAV = import.meta.env.VITE_IMG_LOGO_NAV || '/src/assets/ImgNav.jpeg';

const Search = (props) => {
    const { aux, setAux } = props;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    let curName = useSelector((state) => state?.filters.name);

    useEffect(() => {
        setName(curName);
        //console.log("SEARCH - USEEFECT ACTUALIZO ESTADOS")
    }, [aux]);

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        if (!e.target.value) { // 
            dispatch(clearFilterByName());
        } else { // 
            dispatch(filterVideogamesByName(e.target.value));
            setAux(!aux);
            //setCurrPage(1); ??
        }
    }

    return (
        <div className={container}>
            <div className={containerSec}>
                <input
                    className={input}
                    name="name"
                    type="text"
                    placeholder="Search by name..."
                    value={name}
                    onChange={handleInputChange}
                    id="name"
                />
            </div>
        </div >
    )
}

export default Search;
