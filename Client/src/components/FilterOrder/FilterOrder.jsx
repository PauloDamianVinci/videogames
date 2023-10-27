// hooks, routers, reducers:
import { useSelector } from "react-redux";
//import { useDispatch, useSelector } from "react-redux";
import { setCurrRating, setCurrAZ, setCurrGenre, setCurrOrigin } from "../../redux/actions";
import { useState, useEffect } from "react";
import { filterOriginData, filterVideogamesByGenre, orderByRating, orderByAZ, resetFilterOrder, setCurrPage } from "../../redux/actions";
// Estilos:
import style from "./FilterOrder.module.css";
const { container, containerFiltrosOrden, containerFiltrosOrigen, filtroOrigen, containerFiltrosGenero, filtroGenero, containerOrdenRating, containerOrdenAZ, containerReset, ordenRating, ordenAZ, reset } = style;

const FilterOrder = (props) => {
    const { setCurrentPage, dispatch, dataLoaded } = props;
    const [selectedOptionRating, setSelectedOptionRating] = useState('');
    const [selectedOptionAZ, setSelectedOptionAZ] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('All');
    const [selectedGenre, setSelectedGenre] = useState('All');
    let genres = useSelector((state) => state.genres); // tengo en el store todos los géneros
    let curPageSaved = useSelector((state) => state.curPage);
    let curOptionRating = useSelector((state) => state.curOptionRating);
    let curOptionAZ = useSelector((state) => state.curOptionAZ);
    let curGenre = useSelector((state) => state.curGenre);
    let curOrigin = useSelector((state) => state.curOrigin);

    useEffect(() => {
        if (dataLoaded) {
            // hay datos previamente obtenidos. Recupero los criterios guardados:
            setCurrentPage(curPageSaved);
            setSelectedOptionRating(curOptionRating);
            setSelectedOptionAZ(curOptionAZ);
            setSelectedGenre(curGenre);
            setSelectedOrigin(curOrigin);
        }
    }, [dispatch]);
    //Función de filtrado por origen de los datos:
    function handleOriginData(e) {
        setSelectedOrigin(e.target.value);
        dispatch(filterOriginData(e.target.value));
        dispatch(setCurrOrigin(e.target.value)); // guardo el valor del filtro para cuando vuelva a la página
        setCurrentPage(1);
    }
    //Función de filtrado por género:
    function handleFilterByGenre(e) {
        setSelectedGenre(e.target.value);
        dispatch(filterVideogamesByGenre(e.target.value))
        dispatch(setCurrGenre(e.target.value)); // guardo el valor del filtro para cuando vuelva a la página
        setCurrentPage(1);
    }
    //Función de ordenamiento por rating:
    function handleOrderRating(e) {
        setSelectedOptionRating(e.target.value);
        dispatch(orderByRating(e.target.value));
        dispatch(setCurrRating(e.target.value)); // guardo el valor de ordenamiento para cuando vuelva a la página
        setCurrentPage(1);
    }
    //Función de ordenamiento por orden alfabético:
    function handleOrderAZ(e) {
        setSelectedOptionAZ(e.target.value);
        dispatch(orderByAZ(e.target.value));
        dispatch(setCurrAZ(e.target.value)); // guardo el valor de ordenamiento para cuando vuelva a la página
        setCurrentPage(1);
    }
    // Función de reset de filtros y ordenamientos:
    function handleReset() {
        dispatch(resetFilterOrder());
        setSelectedOptionRating('');
        setSelectedOptionAZ('');
        setSelectedGenre('All');
        setSelectedOrigin('All');
        setCurrentPage(1);
        // borro los filtros y ordenamientos recordados:
        dispatch(setCurrOrigin('All'));
        dispatch(setCurrGenre('All'));
        dispatch(setCurrRating(''));
        dispatch(setCurrAZ(''));
        dispatch(setCurrPage('1'));
    }

    return (
        <div className={container}>
            <div className={containerFiltrosOrden}>
                {/* Filtrado por origen de datos: */}
                <div className={containerFiltrosOrigen}>
                    <h2 className={filtroOrigen}>Origin</h2>
                    <select onChange={handleOriginData} value={selectedOrigin}>
                        <option value="All">All</option>
                        <option value="False">Api</option>
                        <option value="True">Database</option>
                    </select>
                </div>
                {/* Filtrado por género: */}
                <div className={containerFiltrosGenero}>
                    <h2 className={filtroGenero}>Genre</h2>
                    <select onChange={handleFilterByGenre} value={selectedGenre}>
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
        </div>
    )
}

export default FilterOrder;
