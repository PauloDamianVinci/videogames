// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { clearFilterByName, filterVideogamesByName, setNombreBusqueda, setOrigenBusqueda, resetAll, setDataLoaded, setCurrOrigin, setCurrPage } from "../../redux/actions";
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
    // const [hideClean, setHideClean] = useState(false);
    // const [hideSearch, setHideSearch] = useState(false);
    //const [aux, setAux] = useState(false);
    // const [origin, setOrigin] = useState('3')
    // const [selectedOrigin, setSelectedOrigin] = useState('All');
    //const [readOnly, setReadOnly] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isDisabled, setIsDisabled] = useState(false);
    // let nombreBusqueda = useSelector((state) => state.nombreBusqueda);
    // let origenBusqueda = useSelector((state) => state.origenBusqueda);
    // Obtengo los estados de los settings actuales:
    let curName = useSelector((state) => state.filters.name);

    useEffect(() => {
        setName(curName);
        console.log("SEARCH - USEEFECT ACTUALIZO ESTADOS")
    }, [aux]);


    // const handleSearch = () => {
    //     // Valido que haya un nombre para buscar:
    //     if (!name) {
    //         window.alert("Name missing");
    //         return;
    //     };
    //     dispatch(filterVideogamesByName(name));
    //     setHideSearch(false); // oculto search
    //     setHideClean(true); // muestro limpiar búsqueda
    //     setAux(!aux); // es para forzar el refresco del DOM

    //     // Esto hace reset de Filter:
    //     // dispatch(resetFilterAndOrder());
    //     // setCurrentPage(1);
    //     // setAux(!aux); // es para forzar el refresco del DOM


    // }

    // function handleClearSearch(e) {
    //     // Limpio el criterio de búsqueda:
    //     e.preventDefault();
    //     // mandar a limpiar el filtro de nombre al estado:
    //     dispatch(clearFilterByName());
    //     dispatch(filterVideogamesByName('')); // vuelvo a filtrar por nombre pero vacío, para refrescar
    //     setAux(!aux); // es para forzar el refresco del DOM
    //     setName(''); // limpio el input
    //     setHideClean(false); // oculto el propio botón
    //     setHideSearch(false); // muestro de nuevo el botón de búsqueda
    // }

    function handleInputChange(e) {
        // El botón de limpiar filtros se oculta si no hay texto ingresado:
        e.preventDefault();
        setName(e.target.value);
        if (!e.target.value) { // se muestra todo
            dispatch(clearFilterByName());



        } else { // se muestra search
            dispatch(filterVideogamesByName(e.target.value));
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
            {/* <div className={`${hideSearch ? contButton : containerHidden}`}>
                <button className={button} onClick={handleSearch}>Search</button>
            </div>
            <div className={`${hideClean ? contButton : containerHidden}`}>
                <button className={button} onClick={handleClearSearch}>Clear search</button>
            </div > */}
        </div >
    )

}

export default Search;
