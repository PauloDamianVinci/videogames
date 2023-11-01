// Componentes:
import Error from "../../views/Error/Error";
import Nav from "../../components/Nav/Nav";
import FilterOrder from "../../components/FilterOrder/FilterOrder";
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination";
// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getGenres, getPlatforms, setListoMostrar, getVideogames, setDataLoaded, setCurrPage } from "../../redux/actions";
// Variables de entorno:
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';
// Estilos:
import style from "./Home.module.css";
const { container, containerSec, text, img } = style;

const Home = () => {
    const dispatch = useDispatch();

    // Estos valores se usan para cargar todos los videojuegos desde API y BD la primera vez:
    let dataLoaded = useSelector((state) => state.dataLoaded);
    let firstLoad = useSelector((state) => state.firstLoad);
    let listoMostrar = useSelector((state) => state.listoMostrar);
    // Estos valores los usa el componente de paginación:
    let allVideogames = useSelector((state) => state.videogames);
    // Acá llegan los posibles mensajes de error de actions:
    let errors = useSelector((state) => state.errors);
    const [aux, setAux] = useState(false); // para forzar la actualización del DOM en los componentes

    useEffect(() => {
        if (!dataLoaded) { // no hay datos previos. Los obtengo
            dispatch(setListoMostrar()); // para que muestre el reloj de espera
            dispatch(getGenres()); // Obtengo todos los géneros
            dispatch(getPlatforms()); // Obtengo todas las plataformas
            dispatch(getVideogames('3')) // Obtengo todos los videojuegos BD + API
            setCurrentPage(1);
        }
    }, []);

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

    if (listoMostrar && firstLoad > 1) { // firstLoad es para evitar doble renderizado en la carga inicial
        return (
            <div className={container}>
                <Nav aux={aux} setAux={setAux} />
                <FilterOrder aux={aux} setAux={setAux} setCurrentPage={setCurrentPage} dataLoaded={dataLoaded} />
                <Cards aux={aux} setAux={setAux} currentGame={currentGame} />
                <Pagination
                    videogamePerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                    currentPage={currentPage}
                />
            </div >
        );
    } else if (errors) {
        return (
            <div className={container}>
                <div className={containerSec}>
                    <Error message={errors} />
                </div >
            </div>
        );
    } else {
        return (
            <div className={container}>
                <div className={containerSec}>
                    <img className={img} src={IMG_ESPERA} alt="" />
                </div >
            </div>
        );
    }
}

export default Home;