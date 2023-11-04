// ! Vista principal del programa. Obtiene los videojuegos, géneros y plataformas al inicio. Luego renderiza
// ! el nav, las cards, los filtros y también gestiona la paginación.
import axios from 'axios';
// Componentes:
import Error from "../../views/Error/Error.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import FilterOrder from "../../components/FilterOrder/FilterOrder.jsx";
import Cards from "../../components/Cards/Cards.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getGenres, getPlatforms, getVideogames, showError, paginacionPendiente, setListoMostrar, setCurrPage } from "../../redux/actions";
// Variables de entorno:
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const VG_G = import.meta.env.VITE_VG_GENRES || '/genres';
const VG_GENRES = API_URL_BASE + VG_G;
const VG_P = import.meta.env.VITE_VG_PLATFORMS || '/platforms';
const VG_PLATFORMS = API_URL_BASE + VG_P;
const VG_V = import.meta.env.VITE_VG_VIDEOGAMES || '/videogames';
const VG_VIDEOGAMES = API_URL_BASE + VG_V;
// Estilos:
import style from "./Home.module.css";
const { mainTitle, containerLoading, container, img } = style;

const Home = () => {
    const dispatch = useDispatch();
    const [aux, setAux] = useState(false);
    // Estos valores se usan para cargar todos los videojuegos desde API y BD la primera vez:
    let dataLoaded = useSelector((state) => state?.dataLoaded);
    let listoMostrar = useSelector((state) => state?.listoMostrar);
    // Estos valores los usa el componente de paginación:
    let allVideogames = useSelector((state) => state.videogames);
    // Acá llegan los posibles mensajes de error de actions:
    let errors = useSelector((state) => state?.errors);
    // Desde acá recupero la página actual:
    let curPage = useSelector((state) => state?.curPage);
    let pagPending = useSelector((state) => state?.pagPending);
    // Para la carga incial, obtengo el mensaje de hasta dónde llegué a obtener:
    let msgLoad = useSelector((state) => state?.msgLoad);
    let requestMade = false; // evito llamados en paralelo al pedir los datos iniciales

    useEffect(() => {
        if (!dataLoaded && !requestMade) { // no hay datos previos. Los obtengo
            requestMade = true;
            dispatch(setListoMostrar()); // para que muestre el reloj de espera
            axios.get(VG_GENRES) // Géneros
                .then(dataGen => {
                    dispatch(getGenres(dataGen.data)); // actualizo el store
                    return axios.get(VG_PLATFORMS);
                })
                .then(dataPlatforms => { // PLataformas
                    dispatch(getPlatforms(dataPlatforms.data)); // actualizo el store
                    return axios.get(VG_VIDEOGAMES + "/?source=3");
                })
                .then(dataVideogames => { // videojuegos
                    dispatch(getVideogames(dataVideogames.data)); // actualizo el store
                })
                .catch(error => {
                    let msg = '';
                    if (!error.response) {
                        msg = error.message;
                    } else {
                        msg = "Error fetching data: " + error.response.status + " - " + error.response.data;
                    }
                    dispatch(showError(msg)); // actualizo el store
                });
            setCurrentPage(1);
        } else {
            // Recupero la página en que estaba:
            if (pagPending) {
                const totPages = Math.ceil(allVideogames.length / videogamesPerPage);
                if (curPage > totPages) {
                    setCurrentPage(1);
                } else {
                    setCurrentPage(curPage);
                }
                dispatch(paginacionPendiente(false));
            } else {
                setCurrentPage(1);
            }
        }
    }, [aux]);

    // Lógica para el componente de paginado:
    const [currentPage, setCurrentPage] = useState(1); // siempre comienza en página 1
    const [videogamesPerPage, setVideogamesPerPage] = useState(15); // 15 videojuegos por página
    const indexLastGame = currentPage * videogamesPerPage; // hasta
    const indexFirstGame = indexLastGame - videogamesPerPage; //desde
    let currentGame;
    if (allVideogames.length > 0) {
        currentGame = allVideogames.slice(indexFirstGame, indexLastGame); // posición actual
    } else {
        currentGame = [];
    }
    const paginado = (pageNumber) => { // manejado desde el componente Pagination
        setCurrentPage(pageNumber);
        dispatch(setCurrPage(pageNumber)); // memorizo la página actual para cuando salga de la vista y regrese:
    };

    if (errors) {
        return (
            <Error message={errors} />
        );
    } else if (listoMostrar) {
        return (
            <div className={container}>
                <Nav aux={aux} setAux={setAux} />
                <FilterOrder aux={aux} setAux={setAux} setCurrentPage={setCurrentPage} />
                <Cards aux={aux} setAux={setAux} currentGame={currentGame} />
                <Pagination
                    videogamePerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                    currentPage={currentPage}
                />
            </div >
        );
    } else {
        return (
            <div className={containerLoading}>
                <img className={img} src={IMG_ESPERA} alt="" />
                <h1 className={mainTitle}>{msgLoad}</h1>
            </div>
        );
    }
}

export default Home;