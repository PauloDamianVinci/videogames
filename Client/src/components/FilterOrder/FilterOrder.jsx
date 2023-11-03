// hooks, routers, reducers:
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilterAndOrder, filterOriginData, filterVideogamesByGenre, orderByRating, orderByAZ, setCurrPage } from "../../redux/actions";
// Funciones:
import orderArray from "../../functions/orderArray";
// Estilos:
import style from "./FilterOrder.module.css";
const { container, containerFiltrosOrigenGenero, texto, containerOrdenRatingAlfa, contButton, button } = style;

const FilterOrder = (props) => {
    const dispatch = useDispatch();
    const { aux, setAux, setCurrentPage } = props;
    const [selectedOptionRating, setSelectedOptionRating] = useState('');
    const [selectedOptionAZ, setSelectedOptionAZ] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('All');
    const [selectedGenre, setSelectedGenre] = useState('All');
    // Obtengo los géneros:
    let genres = useSelector((state) => state?.genres);
    let genresOrdered = orderArray(genres);
    // Obtengo los estados de los filtros actuales:
    let curGenre = useSelector((state) => state?.filters.genre);
    let curCreate = useSelector((state) => state?.filters.create);
    let curRating = useSelector((state) => state?.filters.rating);
    let curAzza = useSelector((state) => state?.filters.azza);

    useEffect(() => {
        setSelectedGenre(curGenre);
        setSelectedOrigin(curCreate);
        setSelectedOptionRating(curRating);
        setSelectedOptionAZ(curAzza);
    }, [aux]);

    //Función de filtrado por origen de los datos:
    function handleOriginData(e) {
        setSelectedOrigin(e.target.value);
        dispatch(filterOriginData(e.target.value));
        setCurrentPage(1);
        setAux(!aux);
    }
    //Función de filtrado por género:
    function handleFilterByGenre(e) {
        setSelectedGenre(e.target.value);
        dispatch(filterVideogamesByGenre(e.target.value))
        setCurrentPage(1);
        setAux(!aux);
    }
    //Función de ordenamiento por rating:
    function handleOrderRating(e) {
        setSelectedOptionRating(e.target.value);
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setAux(!aux);
    }
    //Función de ordenamiento por orden alfabético:
    function handleOrderAZ(e) {
        setSelectedOptionAZ(e.target.value);
        dispatch(orderByAZ(e.target.value));
        setCurrentPage(1);
        setAux(!aux);
    }
    // Función de reset de filtros y ordenamientos:
    function handleReset() {
        dispatch(resetFilterAndOrder());
        setCurrentPage(1);
        setAux(!aux);
    }

    return (
        <div>
            <div className={container}>
                {/* Filtrado por origen de datos: */}
                <div className={containerFiltrosOrigenGenero}>
                    <h2 className={texto} >Origin:</h2>
                    <select onChange={handleOriginData} value=
                        {selectedOrigin}>
                        <option value="All">All</option>
                        <option value="False">Api</option>
                        <option value="True">Database</option>
                    </select>
                </div>
                {/* Filtrado por género: */}
                <div className={containerFiltrosOrigenGenero}>
                    <h2 className={texto}>Genre:</h2>
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
                {/* Ordenamiento alafabético: */}
                <div className={containerOrdenRatingAlfa}>
                    <h2 className={texto}>Order:</h2>
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
                {/* Ordenamiento por rating: */}
                <div className={containerOrdenRatingAlfa}>
                    <h2 className={texto}>Rating:</h2>
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
                <div className={contButton}>
                    <button className={button} onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default FilterOrder;