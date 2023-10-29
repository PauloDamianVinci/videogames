// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setNombreBusqueda, setOrigenBusqueda, resetAll, setDataLoaded } from "../../redux/actions";
// Estilos:
import style from "./Nav.module.css";
const { container, containerHidden, secondText, startButton, imgBack } = style;
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
        //console.log("cargo NAV");
        setIsLoading(true);
        if (nombreBusqueda) {
            //console.log("con nombres previo");
            // hay datos previamente obtenidos. Recupero los criterios guardados:

            setHideSearch(false);
            setHideClean(true);
            setReadOnly(true);
            setName(nombreBusqueda);
            setSelectedOrigin(origenBusqueda);
            setIsDisabled(true);

            // dispatch(setNombreBusqueda(name));
            // dispatch(setOrigenBusqueda(origin));


            // setCurrentPage(curPageSaved);
            // setSelectedOptionRating(curOptionRating);
            // setSelectedOptionAZ(curOptionAZ);
            // setSelectedGenre(curGenre);
        } else {
            // no hay datos previos
            //console.log("SIN nombres previo");
        }
        setIsLoading(false);
    }, []);


    const handleSearch = () => {
        // Valido el texto a buscar:
        if (!name) {
            window.alert("Name missing");
            return;
        };
        //console.log("Preparo dispach...");
        // Deshabilito la búsqueda hasta que se vuelva a seleccionar:
        //console.log("se oculta search");
        setHideSearch(false);
        //console.log("se muestra clean");
        setHideClean(true);
        setReadOnly(true);
        setIsDisabled(true);
        // Preparo el store para que cargue home nuevamente, pero esta vez con opción de
        // filtrado y origen de búsqueda:
        dispatch(setNombreBusqueda(name));
        dispatch(setOrigenBusqueda(origin));
        dispatch(setDataLoaded(false)); // obligo a home a refrescar datos
        //console.log("Cargo home...");
        setRefresh(!refresh);

        navigate(HOME);
        return;
    }

    const handleExit = () => {
        dispatch(resetAll());
        navigate(ROOT);
    }

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        // El botón de limpiar filtros se oculta si no hay texto ingresado:
        if (!e.target.value) {
            //console.log("se oculta search");
            setHideSearch(false);
        } else {
            //console.log("se muestra search");
            //     setHideClean(true);
            setHideSearch(true);
        }
    }

    function handleViewSearch(e) {
        // Limpio el criterio de búsqueda:
        e.preventDefault();
        //console.log("BORRO");
        setName(''); // limpio el input
        setHideClean(false); // oculto el propio botón
        setReadOnly(false); // permito volver a tipear un nombre
        setIsDisabled(false); // habilito el combo de origen
        // busco todos los reg de nuevo:
        // Preparo el store para que cargue home nuevamente, pero esta vez con opción de
        // filtrado y origen de búsqueda:
        dispatch(setNombreBusqueda(''));
        dispatch(setOrigenBusqueda('3'));
        dispatch(setDataLoaded(false)); // obligo a home a refrescar datos
        //console.log("Cargo home...");
        setRefresh(!refresh);
    }

    function handleOriginData(e) {
        switch (e.target.value) {
            case 'All':
                setOrigin('3'); // ambos
                //console.log("e.target.value->all");
                break;
            case 'False':
                setOrigin('2'); // api
                //console.log("e.target.value->API");
                break;
            case 'True':
                setOrigin('1'); // db
                //console.log("e.target.value->DB");
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
                <select onChange={handleOriginData} disabled={isDisabled} value={selectedOrigin}>
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
                readOnly={readOnly}
            />
            <div className={`${hideSearch ? container : containerHidden}`}>
                <button className={container} onClick={handleSearch}>Search</button>
            </div>
            <div className={`${hideClean ? container : containerHidden}`}>
                <button className={container} onClick={handleViewSearch}>Clear search</button>
            </div >
            <button className={container} onClick={() => navigate(ABOUT)} >About</button>
            <button className={container} onClick={handleExit}>Exit</button>
        </div >
    )
}

export default Nav;
