// Componentes:
import Nav from "../../components/Nav/Nav";
import FilterOrder from "../../components/FilterOrder/FilterOrder";
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination";
// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getGenres, setListoMostrar, getVideogames, getVideogamesbyName, setDataLoaded, setCurrPage } from "../../redux/actions";
// Variables de entorno:
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';
// Estilos:
import style from "./Home.module.css";
const { container, containerImgCargando, imgCargando, containerCards, containerSec, containerHidden } = style;

const Home = () => {
    const dispatch = useDispatch();
    //const [isLoading, setIsLoading] = useState(true);
    let allVideogames = useSelector((state) => state.videogames); // tengo en el store todos los video juegos
    let dataLoaded = useSelector((state) => state.dataLoaded);
    let nombreBusqueda = useSelector((state) => state.nombreBusqueda);
    let refreshHome = useSelector((state) => state.refreshHome);
    let origenBusqueda = useSelector((state) => state.origenBusqueda);
    let listoMostrar = useSelector((state) => state.listoMostrar);
    let firstLoad = useSelector((state) => state.firstLoad);
    let genres = useSelector((state) => state.genres);

    useEffect(() => {
        // Cargo los videojuegos desde la BD y API.
        if (!dataLoaded) { // no hay datos previos. Los obtengo
            dispatch(setListoMostrar()); // para que muestre el reloj de espera
            // Acá se define si voy a traer todos los videojuegos o si se trata de una 
            // búsqueda por nombre. En ambos casos, una vez obtenidos los datos, el tratamiento de 
            // filtro y otros criterios es igual:
            if (!nombreBusqueda) {
                dispatch(getVideogames(origenBusqueda)); // obtengo todos los videojuegos
            } else { // obtengo los videojuegos filtrados por nombre y origen
                setCurrentPage(1);
                dispatch(getVideogamesbyName({ origen: origenBusqueda, nombre: nombreBusqueda }));
            }
            dispatch(getGenres());
        }
    }, [refreshHome]); // -> otros componentes actualizan refreshHome para forzar a refrescar

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
    const paginado = (pageNumber) => { // Manejado desde el componente Pagination
        setCurrentPage(pageNumber);
        // Memorizo la página actual para cuando salga de la vista y regrese:
        dispatch(setCurrPage(pageNumber));
    };

    //console.log("listoMostrar: ", listoMostrar, ", firstLoad: ", firstLoad);
    if (listoMostrar && firstLoad > 1) { // firstLoad es para evitar doble renderizado en la carga inicial
        return (
            <div className={container}>
                <div className={containerSec}>
                    <Nav />
                    <Pagination
                        videogamePerPage={videogamesPerPage}
                        allVideogames={allVideogames.length}
                        paginado={paginado}
                        currentPage={currentPage}
                    />
                    <FilterOrder setCurrentPage={setCurrentPage} dataLoaded={dataLoaded} />
                    <Cards currentGame={currentGame} />
                </div>
            </div >
        );
    } else {
        return (
            <div className={container}>
                <div >
                    <img className={container} src={IMG_ESPERA} alt="" />
                </div>
            </div >
        );
    }
}

export default Home;