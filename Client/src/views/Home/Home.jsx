// Componentes:
import Error from "../../views/Error/Error";
import Nav from "../../components/Nav/Nav";
import FilterOrder from "../../components/FilterOrder/FilterOrder";
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination";
// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setDetail, getGenres, getPlatforms, setListoMostrar, getVideogames, setCurrPage } from "../../redux/actions";
// Variables de entorno:
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';
// Estilos:
import style from "./Home.module.css";
const { container, containerSec, text, img } = style;

const Home = () => {
    const dispatch = useDispatch();
    // Aux para refrescar el DOM:
    const [aux, setAux] = useState(false);

    // useEffect(() => {
    //     dispatch(setListoMostrar())
    //         .then(dispatch(getGenres()))
    //         .then(() => {
    //             setLoading(false);
    //         });
    // }, [dispatch]);

    // Estos valores se usan para cargar todos los videojuegos desde API y BD la primera vez:
    let dataLoaded = useSelector((state) => state?.dataLoaded);
    let firstLoad = useSelector((state) => state?.firstLoad);
    let listoMostrar = useSelector((state) => state?.listoMostrar);
    // Estos valores los usa el componente de paginación:
    let allVideogames = useSelector((state) => state.videogames);
    // Acá llegan los posibles mensajes de error de actions:
    let errors = useSelector((state) => state?.errors);
    // Desde acá recupero la página actual, para cuando rootea y se pierde el valor:
    let curPage = useSelector((state) => state?.curPage);
    let prevDetail = useSelector((state) => state?.prevDetail); // prueba para avisar qu vengo de detail

    useEffect(() => {
        if (!dataLoaded) { // no hay datos previos. Los obtengo

            console.log("HOME ");
            dispatch(setListoMostrar()); // para que muestre el reloj de espera
            dispatch(getGenres()); // Obtengo todos los géneros
            dispatch(getPlatforms()); // Obtengo todas las plataformas
            dispatch(getVideogames('3')) // Obtengo todos los videojuegos BD + API
            setCurrentPage(1);
        } else {
            // Recupero la página en que estaba. Setear sólo si es de retorno
            // desde detalles, pero caso contrario ver de forzarlo a 1:
            if (prevDetail) {
                setCurrentPage(curPage);
                dispatch(setDetail(false));
            } else {
                setCurrentPage(1);
            }
        }
    }, [dispatch, aux]);

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
        // console.log("HACE PAGINADO ", pageNumber)
        setCurrentPage(pageNumber);
        dispatch(setCurrPage(pageNumber)); // memorizo la página actual para cuando salga de la vista y regrese:
    };

    if (errors) {
        return (
            <div className={container}>
                <div className={containerSec}>
                    <Error message={errors} />
                </div >
            </div>
        );
    } else if (listoMostrar && firstLoad > 1) { // firstLoad es para evitar doble renderizado en la carga inicial
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