// hooks, routers, reducers:
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useDispatch, useSelector } from "react-redux";
import { setCurrRating, setCurrAZ, setCurrGenre, setCurrOrigin } from "../../redux/actions";
import { filterOriginData, filterVideogamesByGenre, orderByRating, orderByAZ, resetFilterOrder, setCurrPage } from "../../redux/actions";
// Estilos:
import style from "./FilterOrder.module.css";
const { container, containerFiltrosOrigenGenero, texto, containerOrdenRatingAlfa, contButton, button } = style;
const FilterOrder = (props) => {
    const dispatch = useDispatch();
    const { setCurrentPage, dataLoaded } = props;
    const [selectedOptionRating, setSelectedOptionRating] = useState('');
    const [selectedOptionAZ, setSelectedOptionAZ] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('All');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [isSelectDisabled, setISelectDisabled] = useState(false);
    let genres = useSelector((state) => state.genres); // tengo en el store todos los géneros
    let curPageSaved = useSelector((state) => state.curPage);
    let curOptionRating = useSelector((state) => state.curOptionRating);
    let curOptionAZ = useSelector((state) => state.curOptionAZ);
    let curGenre = useSelector((state) => state.curGenre);
    let curOrigin = useSelector((state) => state.curOrigin);
    let origenBusqueda = useSelector((state) => state.origenBusqueda);
    let nombreBusqueda = useSelector((state) => state.nombreBusqueda);

    useEffect(() => {
        if (dataLoaded) {
            //console.log("Filter, SI hay datos previos recordados")
            // hay datos previamente obtenidos. Recupero los criterios guardados:

            console.log("setCurrentPage e ", curPageSaved);
            setCurrentPage(curPageSaved); // siempre asegurarse que no sea mayor al de páginas total
            setSelectedOptionRating(curOptionRating);
            setSelectedOptionAZ(curOptionAZ);
            setSelectedGenre(curGenre);
            setSelectedOrigin(curOrigin); // establezco el último criterio de origen
        } else {
            //setCurrentPage
            console.log("setCurrentPage ee ", 1);
            setCurrentPage(1);
        }
        if (!nombreBusqueda) {
            //console.log("Filter, NO hay nombre recordados")
            setSelectedOrigin(curOrigin); // establezco el último criterio de origen
            setISelectDisabled(false); // combo de source habilitado
        } else {  // matcheo el criterio de origen con el de la búsqueda
            //console.log("Filter, SI hay nombre recordados")
            switch (origenBusqueda) { // establezco el último criterio de origen según lo que busco
                case '1': // db
                    setSelectedOrigin(true);
                    setISelectDisabled(true); // combo de source deshabilitado
                    break;
                case '2': // api
                    setSelectedOrigin(false);
                    setISelectDisabled(true); // combo de source deshabilitado
                    break;
                case '3': // all
                    setISelectDisabled(false); // combo de source deshabilitado
                    setSelectedOrigin(curOrigin); // establezco el último criterio de origen
                    break;
                default:
            }
        }
        setIsLoading(false);
    }, [nombreBusqueda]);

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
        dispatch(resetFilterOrder());
    }

    return (
        <div>
            {isLoading ? (
                <div className={container}>
                    <h2>...</h2>
                </div>
            ) : (
                <div className={container}>
                    {/* Filtrado por origen de datos: */}
                    <div className={containerFiltrosOrigenGenero}>
                        <h2 className={texto} style={{ display: isSelectDisabled ? 'none' : 'block' }}>Origin:</h2>
                        <select onChange={handleOriginData} style={{ display: isSelectDisabled ? 'none' : 'block' }} value=
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
            )}
        </div>
    )
}

export default FilterOrder;