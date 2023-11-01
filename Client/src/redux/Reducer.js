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
    SET_LISTO_MOSTRAR,
    SET_FIRST_BUSQUEDA,
    SET_ERROR_MSG,
    FILTER_BY_NAME,
    CLEAR_FILTER_BY_NAME,
    RESET_FILTER_ORDER,
} from "./actions";

const initialState = {
    allVideogames: [], // están todos los videojuegos obtenidos desde el back. Sólo se actualiza cuando cambian desde la BD o si se hace búsqueda por nombre
    videogames: [], // están los videojuegos que se muestran en pantalla luego de filtros y ordenamientos
    filteredVideogames: [], // filteredVideogames: resultados de búsquedas
    genres: [], // están todos los géneros obtenidos desde el back.
    platforms: [], // están todas las plataformas obtenidos desde el back.
    detail: [], // están los detalles de una búsqueda por id
    filters: { // es para que la lógica de los filtros respete las combinaciones previas
        genre: "All",
        create: "All",
        rating: "",
        azza: "",
        name: "",
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
    listoMostrar: false, // flag para que home refresque registros mostrando reloj
    firstLoad: 0, // contador de ocurrencias, evita el doble renderizado al comienzo
    errors: '', // guardo los mensajes de error para mostrar en la pag.
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_GENRES:
            return {
                ...state,
                genres: payload,
                errors: '',
            };
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: payload,
                errors: '',
            };
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: payload,
                videogames: payload,
                filteredVideogames: payload,
                listoMostrar: true,
                dataLoaded: true,
                firstLoad: state.firstLoad + 1,
                errors: '',
            };
        case SET_ERROR_MSG:
            return {
                ...state,
                errors: payload,
            };
        case SET_LISTO_MOSTRAR:
            return {
                ...state,
                listoMostrar: false,
            };
        case FILTER_BY_NAME:
            //console.log("NAME: ", payload)
            console.log("FILTER_BY_NAME: ")
            console.log("ORIGIN: ", state.filters.create)
            console.log("GENRE: ", state.filters.genre)
            console.log("NAME: ", payload, " NAME de antes: ", state.filters.name)
            const filteredByName = state.allVideogames.filter((elem) => {
                // Respeto el tipo de filtro de género existente:
                const genreMatch =
                    (state.filters.genre === "All") ||
                    elem.Genres?.some((genre) => genre.name === state.filters.genre) ||
                    elem.Genres?.some((genre) => genre === state.filters.genre);
                // Respeto el origin existente. True -> DB, False -> API:
                const createMatch =
                    state.filters.create === "All" ||
                    (state.filters.create === "True" && elem.OriginDB) ||
                    (state.filters.create === "False" && !elem.OriginDB);
                // Hago el filtro de nombre:
                const NameMatch =
                    // coincidencia parcial, sin distinción entre mayúsculas y minúsculas)
                    (state.filters.name === "") ||
                    (elem.name.toLowerCase().includes(payload.toLowerCase().trim()));
                // (state.filters.name === "") ||
                // (elem.name.toLowerCase().trim() === payload.toLowerCase().trim() && elem.name);
                return NameMatch && genreMatch && createMatch; // va al filtro si cumple todas las condiciones
            });

            // (state.filters.name === "") ||
            // (elem.name.toLowerCase() === payload.toLowerCase());
            console.log("filteredByName: ", filteredByName)
            console.log("todos: ", state.allVideogames)

            return {
                ...state,
                videogames: filteredByName,
                filteredVideogames: filteredByName,
                // Establezco el filtro actual para recordar al combinar con otros a futuro:
                filters: {
                    ...state.filters,
                    name: payload,
                },
            };
        case CLEAR_FILTER_BY_NAME:
            console.log("Borro filtro NAME")
            // Borro el filtro de búsqueda por nombre:
            return {
                ...state,
                videogames: state.allVideogames,
                filteredVideogames: state.allVideogames,
                filters: {
                    ...state.filters,
                    name: "",
                },
            };

        case FILTER_ORIGIN_CREATE:
            console.log("FILTER_ORIGIN_CREATE: ")
            console.log("ORIGIN: ", payload, " ORIGIN de antes: ", state.filters.create)
            console.log("GENRE: ", state.filters.genre)
            console.log("NAME: ", state.filters.name)

            const filteredByOrigin = state.allVideogames.filter((elem) => {
                // Respeto el tipo de filtro de género existente:
                const genreMatch =
                    (state.filters.genre === "All") ||
                    elem.Genres?.some((genre) => genre.name === state.filters.genre) ||
                    elem.Genres?.some((genre) => genre === state.filters.genre);
                // Respeto el filtro de nombre existente:
                const NameMatch =
                    // coincidencia parcial, sin distinción entre mayúsculas y minúsculas)
                    (state.filters.name === "") ||
                    (elem.name.toLowerCase().includes(state.filters.name.toLowerCase().trim()));

                //    (state.filters.name === "") ||
                //     (elem.name.toLowerCase().trim() === state.filters.name.toLowerCase().trim() && elem.name);
                // Hago el filtro de origin. True -> DB, False -> API:
                const createMatch =
                    payload === "All" ||
                    (payload === "True" && elem.OriginDB) ||
                    (payload === "False" && !elem.OriginDB);


                return NameMatch && genreMatch && createMatch; // va al filtro si cumple todas las condiciones
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
            console.log("FILTER_BY_GENRE: ")
            console.log("ORIGIN: ", state.filters.create)
            console.log("GENRE: ", payload, " GENRE de antes: ", state.filters.genre)
            console.log("NAME: ", state.filters.name)


            const filteredByGenre = state.allVideogames.filter((elem) => {
                // Respeto el origin existente. True -> DB, False -> API:
                const createMatch =
                    state.filters.create === "All" ||
                    (state.filters.create === "True" && elem.OriginDB) ||
                    (state.filters.create === "False" && !elem.OriginDB);
                // Respeto el filtro de nombre existente:
                const NameMatch =
                    // coincidencia parcial, sin distinción entre mayúsculas y minúsculas)
                    (state.filters.name === "") ||
                    (elem.name.toLowerCase().includes(state.filters.name.toLowerCase().trim()));


                // (state.filters.name === "") ||
                // (elem.name.toLowerCase().trim() === state.filters.name.toLowerCase().trim() && elem.name);
                // Hago el filtro por género:
                const genreMatch =
                    (payload === "All") ||
                    elem.Genres?.some((genre) => genre.name === payload) ||
                    elem.Genres?.some((genre) => genre === payload);
                return NameMatch && genreMatch && createMatch; // va al filtro si cumple todas las condiciones
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
                // Establezco el criterio actual para recordar al combinar con otros a futuro:
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
                // Establezco el criterio actual para recordar al combinar con otros a futuro:
                filters: {
                    ...state.filters,
                    azza: payload,
                },
            };
        case RESET_FILTER_ORDER:
            return {
                ...state,
                videogames: state.allVideogames,
                filteredVideogames: state.allVideogames,
                filters: {
                    ...state.filters,
                    genre: "All",
                    create: "All",
                    rating: "",
                    azza: "",
                    name: "",
                },
            };
        case POST_GAME:
            return {
                ...state,
                allVideogames: payload,
                videogames: payload,
                filteredVideogames: payload,
                listoMostrar: false,
                dataLoaded: false,
                firstLoad: state.firstLoad + 1,
                errors: '',
            };






        ///////////////////////////////////////////

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
        case VG_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                allVideogames: payload,
                videogames: payload,
                filteredVideogames: payload,
                listoMostrar: true,
                dataLoaded: true,
                firstLoad: state.firstLoad + 1,
                errors: '',
            };
        case SET_FIRST_BUSQUEDA:
            return {
                ...state,
                firstLoad: 0,
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

        case RESET:
            return {
                ...state,
                videogames: state.allVideogames,
                filteredVideogames: state.allVideogames,
                filters: {
                    ...state.filters,
                    genre: "All",
                    create: "All",
                    rating: "",
                    azza: "",
                    name: "",
                },
                // dataLoaded: false, // flag para saber si tengo previamente cargados los videojuegos y géneros
                // curPage: '1', // recuerdo el número de página para cuando regrese a la página
                // curOptionRating: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
                // curOptionAZ: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
                // curGenre: 'All', // recuerdo el filtro de género para cuando regrese a la página
                // curOrigin: 'All', // recuerdo el origen de datos para cuando regrese a la página
                // origenBusqueda: '3', // guardo el origen de la búsqueda por nombre. 1: BD, 2: API, 3: ambas
                // //listoMostrar: false,
                // //firstLoad: 0,
                // errors: '',
            };
        case RESET_ALL:
            return {
                ...state,
                videogames: state.allVideogames,
                filteredVideogames: state.allVideogames,
                filters: {
                    ...state.filters,
                    genre: "All",
                    create: "All",
                    rating: "",
                    azza: "",
                    name: "",
                },
                dataLoaded: false, // flag para saber si tengo previamente cargados los videojuegos y géneros
                curPage: '1', // recuerdo el número de página para cuando regrese a la página
                curOptionRating: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
                curOptionAZ: '', // recuerdo el criterio de ordenamiento para cuando regrese a la página
                curGenre: 'All', // recuerdo el filtro de género para cuando regrese a la página
                curOrigin: 'All', // recuerdo el origen de datos para cuando regrese a la página
                nombreBusqueda: '', // guardo el nombre de la búsqueda. Si está vacío, traigo todos los videojuegos
                origenBusqueda: '3', // guardo el origen de la búsqueda por nombre. 1: BD, 2: API, 3: ambas
                firstLoad: 0,
                errors: '',
            };
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                detail: payload,
                errors: '',
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