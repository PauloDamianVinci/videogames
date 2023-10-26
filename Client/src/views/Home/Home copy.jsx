// Componentes:
import Nav from "../../components/Nav/Nav";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
// hooks, routers, reducers:
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getVideogames, getGenres, filterOriginData, filterVideogamesByGenre, orderByRating, orderByAZ, resetFilterOrder, } from "../../redux/actions";
// Variables de entorno:
const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/Loading.gif';
// Estilos:
import style from "./Home.module.css";
const { container, imgBack, containerImgCargando, imgCargando, containerCards, containerSec, containerFiltrosOrden, containerFiltrosOrigen, filtroOrigen, containerFiltrosGenero, filtroGenero, containerOrdenRating, containerOrdenAZ, containerReset, ordenRating, ordenAZ, reset } = style;

const Home = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOptionRating, setSelectedOptionRating] = useState('');
    const [selectedOptionAZ, setSelectedOptionAZ] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('All');
    const [selectedGenre, setSelectedGenre] = useState('All');
    let allVideogames = useSelector((state) => state.videogames); // tengo en el store todos los video juegos
    let genres = useSelector((state) => state.genres); // tengo en el store todos los géneros

    useEffect(() => {
        // Cargo los videojuegos y géneros desde la BD y API.
        // Se van a actualizar automáticameente cuando se hagan cambios:
        setIsLoading(true);
        dispatch(getVideogames());
        dispatch(getGenres());
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
        setCurrentPage(pageNumber);
    };
    //Función de filtrado por origen de los datos:
    function handleOriginData(e) {
        setSelectedOrigin(e.target.value);
        dispatch(filterOriginData(e.target.value));
        setCurrentPage(1);
    }
    //Función de filtrado por género:
    function handleFilterByGenre(e) {
        setSelectedGenre(e.target.value);
        dispatch(filterVideogamesByGenre(e.target.value))
        setCurrentPage(1);
    }
    //Función de ordenamiento por rating:
    function handleOrderRating(e) {
        setSelectedOptionRating(e.target.value);
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
    }
    //Función de ordenamiento por orden alfabético:
    function handleOrderAZ(e) {
        setSelectedOptionAZ(e.target.value);
        dispatch(orderByAZ(e.target.value));
        setCurrentPage(1);
    }
    // Función de reset de filtros y ordenamientos:
    function handleReset() {
        dispatch(resetFilterOrder());
        setSelectedOptionRating('');
        setSelectedOptionAZ('');
        setSelectedGenre('All');
        setSelectedOrigin('All');
    }

    // mostrar un reloj mientras se carga todo
    return (
        <div className={container}>
            {isLoading ? (
                <div className={containerImgCargando}>
                    <img className={imgCargando} src={IMG_ESPERA} alt="" />
                </div>
            ) : allVideogames ? (
                <div className={containerSec}>
                    <div>
                        {/* Cargo el componente navegador: */}
                        <Nav />
                    </div>
                    <div className={containerFiltrosOrden}>
                        {/* Filtrado por origen de datos: */}
                        <div className={containerFiltrosOrigen}>
                            <h2 className={filtroOrigen}>Origin</h2>
                            <select onChange={handleOriginData} value={selectedOrigin}>
                                {/* {" "} */}
                                <option value="All">All</option>
                                <option value="False">Api</option>
                                <option value="True">Database</option>
                            </select>
                        </div>
                        {/* Filtrado por género: */}
                        <div className={containerFiltrosGenero}>
                            <h2 className={filtroGenero}>Genre</h2>
                            <select onChange={handleFilterByGenre} value={selectedGenre}>
                                {/* {" "} */}
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
                        {/* Ordenamiento por rating: */}
                        <div className={containerOrdenRating}>
                            <h2 className={ordenRating}>Rating</h2>
                            <label>
                                <input
                                    type="radio"
                                    name="Ascending"
                                    value="Ascending"
                                    checked={selectedOptionRating === 'Ascending'}
                                    onChange={handleOrderRating}
                                />
                                Ascending
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="Descending"
                                    value="Descending"
                                    checked={selectedOptionRating === 'Descending'}
                                    onChange={handleOrderRating}
                                />
                                Descending
                            </label>
                        </div>
                        {/* Ordenamiento alafabético: */}
                        <div className={containerOrdenAZ}>
                            <h2 className={ordenAZ}>Ordenamiento</h2>
                            <label>
                                <input
                                    type="radio"
                                    name="AZ"
                                    value="AZ"
                                    checked={selectedOptionAZ === 'AZ'}
                                    onChange={handleOrderAZ}
                                />
                                A-Z
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="ZA"
                                    value="ZA"
                                    checked={selectedOptionAZ === 'ZA'}
                                    onChange={handleOrderAZ}
                                />
                                Z-A
                            </label>
                        </div>
                        <div className={containerReset}>
                            <button className={reset} onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                    {/* Cargo los componentes card con los datos actualizados: */}
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