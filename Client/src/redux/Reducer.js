import {
    GET_VIDEOGAMES,
    GET_PLATFORMS,
    GET_GENRES,
    FILTER_BY_GENRE,
    FILTER_ORIGIN_CREATE,
    ORDER_BY_RATING,
    ORDER_BY_AZ,
    RESET,
    RESET_ALL,
    GET_VIDEOGAME_BY_ID,
    CLEAR_DETAIL,
    DATA_LOADED,
    SET_CURR_PAGE,
    SET_CURR_RATING,
    SET_CURR_AZ,
    SET_CURR_GENRE,
    SET_CURR_ORIGIN,
    VG_VIDEOGAMES_BY_NAME,
    SET_NAME_SEARCH,
    SET_SOURCE_SEARCH,
    POST_GAME,
    SET_REFRESH_HOME,
} from "./actions";

const initialState = {
    allVideogames: [], // están todos los videojuegos obtenidos desde el back. Sólo se actualiza cuando cambian desde la BD o si se hace búsqueda por nombre
    videogames: [], // están los videojuegos que se van filtrando y ordenando
    filteredVideogames: [], // filteredVideogames: resultados de búsquedas
    genres: [], // están todos los géneros obtenidos desde el back.
    platforms: [], // están todas las plataformas obtenidos desde el back.
    detail: [], // están los detalles de una búsqueda por id
    filters: { // es para que la lógica de los filtros respete las combinaciones previas
        genre: "All",
        create: "All",
        rating: "",
        azza: "",
    },
    dataLoaded: false, // flag para saber si tengo previamente cargados los videojuegos y géneros
    curPage: '1', // recuerdo el número de página para cuando regrese a la página
    curOptionRating: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
    curOptionAZ: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
    curGenre: 'All', // recuerdo el filtro de género para cuando regrese a la página
    curOrigin: 'All', // recuerdo el origen de datos para cuando regrese a la página
    nombreBusqueda: '', // guardo el nombre de la búsqueda. Si está vacío, traigo todos los videojuegos
    origenBusqueda: '3', // guardo el origen de la búsqueda por nombre. 1: BD, 2: API, 3: ambas
    refreshHome: false, // para hacer que el home recargue en diferentes criterios
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case POST_GAME:
            return {
                ...state,
            };
        case SET_REFRESH_HOME:
            return {
                ...state,
                refreshHome: !state.refreshHome,
            };
        case SET_NAME_SEARCH:
            return {
                ...state,
                nombreBusqueda: payload,
            };
        case SET_SOURCE_SEARCH:
            return {
                ...state,
                origenBusqueda: payload,
            };
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: payload,
                videogames: payload,
                filteredVideogames: payload,
            };
        case VG_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                allVideogames: payload,
                videogames: payload,
                filteredVideogames: payload,
            };
        case SET_CURR_PAGE:
            return {
                ...state,
                curPage: payload,
            };
        case SET_CURR_RATING:
            return {
                ...state,
                curOptionRating: payload,
            };
        case SET_CURR_AZ:
            return {
                ...state,
                curOptionAZ: payload,
            };
        case SET_CURR_GENRE:
            return {
                ...state,
                curGenre: payload,
            };
        case SET_CURR_ORIGIN:
            return {
                ...state,
                curOrigin: payload,
            };
        case DATA_LOADED:
            return {
                ...state,
                dataLoaded: payload,
            };
        case GET_GENRES:
            return {
                ...state,
                genres: payload,
            };
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: payload,
            };
        case FILTER_ORIGIN_CREATE:
            const filteredByOrigin = state.allVideogames.filter((elem) => {
                const genreMatch =
                    // Respeto el tipo de filtro de género existente:
                    (state.filters.genre === "All") ||
                    elem.Genres?.some((genre) => genre.name === state.filters.genre) ||
                    elem.Genres?.some((genre) => genre === state.filters.genre);
                // True -> DB, False -> API
                const createMatch =
                    payload === "All" ||
                    (payload === "True" && elem.OriginDB) ||
                    (payload === "False" && !elem.OriginDB);
                return genreMatch && createMatch; // va al filtro si cumple ambas condiciones
            });
            return {
                ...state,
                videogames: filteredByOrigin,
                filteredVideogames: filteredByOrigin,
                // Establezco el filtro actual para recordar al combinar con otros a futuro:
                filters: {
                    ...state.filters,
                    create: payload,
                },
            };
        case FILTER_BY_GENRE:
            // Sólo paso si seleccionó un género, en vez de pedir por todos. 
            const filteredByGenre = state.allVideogames.filter((elem) => {
                // some() verifica si al menos uno de los elementos en el arreglo cumple con la
                // condición de que el nombre del género sea igual a payload
                const genreMatch =
                    (payload === "All") ||
                    elem.Genres?.some((genre) => genre.name === payload) ||
                    elem.Genres?.some((genre) => genre === payload);
                // Respeto el tipo de filtro de origen existente:
                // True -> DB, False -> API
                const createMatch =
                    state.filters.create === "All" ||
                    (state.filters.create === "True" && elem.OriginDB) ||
                    (state.filters.create === "False" && !elem.OriginDB);
                return genreMatch && createMatch; // va al filtro si cumple ambas condiciones
            });
            return {
                ...state,
                videogames: filteredByGenre,
                filteredVideogames: filteredByGenre,
                // Establezco el filtro actual para recordar al combinar con otros a futuro:
                filters: {
                    ...state.filters,
                    genre: payload,
                },
            };
        case ORDER_BY_RATING:
            const orderedByRating = state.filteredVideogames.slice().sort((a, b) => {
                if (payload === "Ascending") {
                    return a.rating - b.rating;
                } else if (payload === "Descending") {
                    return b.rating - a.rating;
                }
                return 0; // devuelvo cero si no hay cambios en el orden.
            });
            return {
                ...state,
                videogames: orderedByRating,
                // Establezco el criterio de actual para recordar al combinar con otros a futuro:
                filters: {
                    ...state.filters,
                    rating: payload,
                },
            };
        case ORDER_BY_AZ:
            const orderedByAZ = state.filteredVideogames.slice().sort((a, b) => {
                if (payload === "AZ") {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                } else if (payload === "ZA") {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
                }
                return 0;
            });
            return {
                ...state,
                videogames: orderedByAZ,
                // Establezco el criterio de actual para recordar al combinar con otros a futuro:
                filters: {
                    ...state.filters,
                    azza: payload,
                },
            };
        case RESET:
            return {
                ...state,
                videogames: state.allVideogames,
                filteredVideogames: state.allVideogames,
                filters: {
                    genre: "All",
                    create: "All",
                    rating: "",
                    azza: "",
                },
                dataLoaded: false, // flag para saber si tengo previamente cargados los videojuegos y géneros
                curPage: '1', // recuerdo el número de página para cuando regrese a la página
                curOptionRating: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
                curOptionAZ: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
                curGenre: 'All', // recuerdo el filtro de género para cuando regrese a la página
                curOrigin: 'All', // recuerdo el origen de datos para cuando regrese a la página
                origenBusqueda: '3', // guardo el origen de la búsqueda por nombre. 1: BD, 2: API, 3: ambas
            };
        case RESET_ALL:
            return {
                ...state,
                videogames: state.allVideogames,
                filteredVideogames: state.allVideogames,
                filters: {
                    genre: "All",
                    create: "All",
                    rating: "",
                    azza: "",
                },
                dataLoaded: false, // flag para saber si tengo previamente cargados los videojuegos y géneros
                curPage: '1', // recuerdo el número de página para cuando regrese a la página
                curOptionRating: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
                curOptionAZ: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
                curGenre: 'All', // recuerdo el filtro de género para cuando regrese a la página
                curOrigin: 'All', // recuerdo el origen de datos para cuando regrese a la página
                nombreBusqueda: '', // guardo el nombre de la búsqueda. Si está vacío, traigo todos los videojuegos
                origenBusqueda: '3', // guardo el origen de la búsqueda por nombre. 1: BD, 2: API, 3: ambas
            };
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                detail: payload,
            };
        case CLEAR_DETAIL:
            return {
                ...state,
                detail: [],
            }
        default:
            return { ...state };
    }
};
export default rootReducer;