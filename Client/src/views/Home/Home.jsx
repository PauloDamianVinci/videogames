// Componentes:
import Nav from "../../components/Nav/Nav";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
    getVideogames,
    getGenres,
    filterVideogamesByGenre,
    filterOriginData,
    // orderByRating,
    // orderByalphabet,
    // reset,
} from "../../redux/actions";
// Estilos:
import style from "./Home.module.css";
const { container, mainTitle, secondText, startButton, imgBack, ThirdText } = style;

const Home = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    let allVideogames = useSelector((state) => state.videogames);
    let genres = useSelector((state) => state.genres);

    useEffect(() => {
        // Cargo los videojuegos, géneros y plataformas desde la BD y API.
        // Se van a actualizar automáticameente cuando se hagan cambios:
        setIsLoading(true);
        dispatch(getVideogames());
        dispatch(getGenres());
        setIsLoading(false);
    }, [dispatch]);

    // Preparo la lógica para el componente de paginado:
    const [currentPage, setCurrentPage] = useState(1); // siempre comienza en 1
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
        setCurrentPage(pageNumber);
    };

    function handleFilterByGenre(e) {
        dispatch(filterVideogamesByGenre(e.target.value))
        setCurrentPage(1);
    }

    function handleOriginData(e) {
        dispatch(filterOriginData(e.target.value));
        setCurrentPage(1);
    }
    function handleOrder(e) {
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
    }

    function handleAlphabetOrder(e) {
        dispatch(orderByalphabet(e.target.value));
        setCurrentPage(1);
    }

    function handleReset() {
        dispatch(reset());
    }


    // mostrar un reloj mientras se carga todo
    return (
        <div className={container}>
            {isLoading ? (
                <div className={container}>
                    {/* <img className={imgCargando} src={IMG_ESPERA} alt="" /> */}
                    <h1 className={ThirdText}>Cargando...</h1>
                </div>
            ) : allVideogames ? (
                <div className={container}>
                    <div>
                        {/* Cargo el componente navegador: */}
                        <Nav />
                    </div>
                    <div className={mainTitle}>
                        <h1>My video games</h1>
                    </div>
                    {/* Filtrado por origen de datos: */}
                    <div className={secondText}>
                        <div className={startButton}>
                            <h2 className={container}>Origin</h2>
                            <select onChange={handleOriginData}>
                                {" "}
                                <option value="All">All</option>
                                <option value="False">Api</option>
                                <option value="True">Database</option>
                            </select>
                        </div>
                        {/* Filtrado por género: */}
                        <div className={startButton}>
                            <h2 className={imgBack}>Genre</h2>
                            <select onChange={handleFilterByGenre}>
                                {" "}
                                <option value="All">All</option>
                                {genres.map((genre) => {
                                    return (
                                        <option key={genre.id} value={genre.name}>
                                            {genre.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        {/* Modo de ordenamiento: */}
                        <div className={startButton}>
                            <h2 className={container}>Rating</h2>
                            <select onChange={handleOrder}>
                                {" "}
                                <option value="Descendente">Mayor</option>
                                <option value="Ascendente">Minor</option>
                            </select>
                        </div>
                        {/* Ordenamiento alafbético: */}
                        <div className={imgBack}>
                            <h2 className={container}>Order</h2>
                            <select onChange={handleAlphabetOrder}>
                                {" "}
                                <option value="All">...</option>
                                <option value="AscendenteAlp">A-Z</option>
                                <option value="Descendentealp">Z-A</option>
                            </select>
                        </div>
                        <div className={container}>
                            <button className={container} onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                    {/* Cargo los componentes card con los datos actualizados: */}
                    <div className={container}>
                        {currentGame?.map((el) => {
                            return (
                                <Card
                                    id={el.id}
                                    key={el.id}
                                    name={el.name}
                                    image={el.image}
                                    genre={el.genre}
                                    genres={el.genres}
                                />
                            );
                        })}
                    </div>
                    {/* Cargo el componente de paginación: */}
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
