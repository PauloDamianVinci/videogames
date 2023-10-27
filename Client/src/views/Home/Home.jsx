// Componentes:
import Nav from "../../components/Nav/Nav";
import FilterOrder from "../../components/FilterOrder/FilterOrder";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getVideogames, getGenres, setDataLoaded, setCurrPage } from "../../redux/actions";
// Variables de entorno:
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';
// Estilos:
import style from "./Home.module.css";
const { container, containerImgCargando, imgCargando, containerCards, containerSec } = style;

const Home = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    let allVideogames = useSelector((state) => state.videogames); // tengo en el store todos los video juegos
    let genres = useSelector((state) => state.genres); // tengo en el store todos los géneros
    let dataLoaded = useSelector((state) => state.dataLoaded);
    let curPageSaved = useSelector((state) => state.curPage);

    useEffect(() => {
        // Cargo los videojuegos y géneros desde la BD y API.
        // Se van a actualizar automáticamente cuando se hagan cambios:
        setIsLoading(true);
        if (!dataLoaded) {
            console.log("sin datos previos");

            const tiempoEspera = 200; // espera temporaria para ver imagen de espera
            const timerId = setTimeout(() => {
                dispatch(getVideogames());
                dispatch(getGenres());
                // Indico que ya tengo datos cargados, para que no refresque cada vez que vuelva:
                dispatch(setDataLoaded(true));

            }, tiempoEspera);
        } else {
            setCurrentPage(curPageSaved);
            console.log("CON datos previos - pag", curPageSaved);
        }

        //console.log("useEffect currentPage: ", currentPage);
        setIsLoading(false);

    }, [dispatch]);

    // Lógica para el componente de paginado:
    const [currentPage, setCurrentPage] = useState(1); // siempre comienza en página 1
    const [videogamesPerPage, setVideogamesPerPage] = useState(15); // 15 videojuegos por página
    const indexLastGame = currentPage * videogamesPerPage; // hasta
    const indexFirstGame = indexLastGame - videogamesPerPage; //desde
    let currentGame;
    if (allVideogames.length > 0) { // posición actual
        currentGame = allVideogames.slice(indexFirstGame, indexLastGame);
    } else {
        currentGame = [];
    }
    const paginado = (pageNumber) => {
        console.log("paginado-> pageNumber: ", pageNumber);
        setCurrentPage(pageNumber);
        // memorizo la página actual para cuando salga de la vista:
        dispatch(setCurrPage(pageNumber));
    };
    // Cargo los componentes navegador, filtros y ordenamiento, cards y paginación:
    return (
        <div className={container}>
            {isLoading ? (
                <div className={containerImgCargando}>
                    <img className={imgCargando} src={IMG_ESPERA} alt="" />
                </div>
            ) : genres ? (
                <div className={containerSec}>
                    <Nav />
                    <FilterOrder setCurrentPage={setCurrentPage} dispatch={dispatch} />
                    <div className={containerCards}>
                        {currentGame?.map((el) => {
                            return (
                                <Card
                                    id={el.id}
                                    key={el.id}
                                    name={el.name}
                                    image={el.image}
                                    genre={el.genre}
                                    genres={el.genres}
                                    rating={el.rating}
                                />
                            );
                        })}
                    </div>
                    <Pagination
                        videogamePerPage={videogamesPerPage}
                        allVideogames={allVideogames.length}
                        paginado={paginado}
                        currentPage={currentPage}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default Home;