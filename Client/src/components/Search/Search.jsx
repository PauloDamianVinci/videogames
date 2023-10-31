// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setRefreshHome, setNombreBusqueda, setOrigenBusqueda, resetAll, setDataLoaded, setCurrOrigin, setCurrPage } from "../../redux/actions";
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
    const { ocultarCreate, setOcultarCreate } = props;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [hideClean, setHideClean] = useState(false);
    const [hideSearch, setHideSearch] = useState(false);
    const [origin, setOrigin] = useState('3')
    const [selectedOrigin, setSelectedOrigin] = useState('All');
    const [readOnly, setReadOnly] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    let nombreBusqueda = useSelector((state) => state.nombreBusqueda);
    let origenBusqueda = useSelector((state) => state.origenBusqueda);

    useEffect(() => {
        setIsLoading(true);
        if (nombreBusqueda) {
            // hay datos previamente obtenidos. Recupero los criterios guardados:
            setHideSearch(false); // oculto search
            setHideClean(true); // muestro limpiar búsqueda
            setReadOnly(true); // no permito tipear en el input
            setName(nombreBusqueda); // guardo el nombre a buscar
            setIsDisabled(true); // deshabilito el combo de selección de origen
            setSelectedOrigin(origenBusqueda); // guardo el origen de la búsqueda
        }
        setIsLoading(false);
    }, []);

    const handleSearch = () => {
        // Valido que haya un nombre para buscar:
        if (!name) {
            window.alert("Name missing");
            return;
        };

        // Deshabilito la búsqueda hasta que se limpie manualmente:
        setHideSearch(false); // oculto search
        setHideClean(true); // muestro limpiar búsqueda
        setReadOnly(true); // no permito tipear en el input
        setIsDisabled(true); // deshabilito el combo de selección de origen
        // Preparo el store para que cargue home nuevamente, pero esta vez con opción de
        // filtrado y origen de búsqueda:
        dispatch(setNombreBusqueda(name));
        dispatch(setCurrPage('1')); // siempre inicia en página 1 la búsqueda
        dispatch(setOrigenBusqueda(origin));
        dispatch(setDataLoaded(false)); // obligo a home a refrescar datos
        dispatch(setRefreshHome()); // obligo a home a refrescar datos
        return;
    }

    function handleClearSearch(e) {
        // Limpio el criterio de búsqueda:
        e.preventDefault();
        setName(''); // limpio el input
        setHideClean(false); // oculto el propio botón
        setReadOnly(false); // permito volver a tipear un nombre
        setIsDisabled(false); // habilito el combo de origen
        setSelectedOrigin('3');
        setOrigin('3');


        // busco todos los reg de nuevo:
        // Preparo el store para que cargue home nuevamente, pero esta vez con opción de
        // filtrado y origen de búsqueda:
        dispatch(setNombreBusqueda(''));
        dispatch(setCurrPage('1')); // siempre inicia en página 1 la búsqueda
        dispatch(setCurrOrigin('All')); // le aviso a Filter que empiece por todos los orígenes
        dispatch(setOrigenBusqueda('3'));
        dispatch(setDataLoaded(false)); // obligo a home a refrescar datos
        dispatch(setRefreshHome()); // obligo a home a refrescar datos
    }

    function handleInputChange(e) {
        // El botón de limpiar filtros se oculta si no hay texto ingresado:
        e.preventDefault();
        setName(e.target.value);
        if (!e.target.value) { // se oculta search
            setHideSearch(false);
        } else { // se muestra search
            setHideSearch(true);
        }
    }

    function handleOriginData(e) {
        switch (e.target.value) {
            case 'All':
                setOrigin('3'); // ambos
                break;
            case 'False':
                setOrigin('2'); // api
                break;
            case 'True':
                setOrigin('1'); // db
                break;
            default:
        }
        setSelectedOrigin(e.target.value);
    }


    return (
        <div className={container}>
            <div className={containerSec}>
                <input
                    className={input}
                    type="text"
                    placeholder="Search by name..."
                    value={name}
                    onChange={handleInputChange}
                    id="name"
                    readOnly={readOnly}
                />
                <h2 className={mainTitle}>Origin:</h2>
                <select className={input} onChange={handleOriginData} disabled={isDisabled} value={selectedOrigin}>
                    <option value="All">All</option>
                    <option value="False">Api</option>
                    <option value="True">Database</option>
                </select>
            </div>
            <div className={`${hideSearch ? contButton : containerHidden}`}>
                <button className={button} onClick={handleSearch}>Search</button>
            </div>
            <div className={`${hideClean ? contButton : containerHidden}`}>
                <button className={button} onClick={handleClearSearch}>Clear search</button>
            </div >
        </div >
    )

}

export default Search;
