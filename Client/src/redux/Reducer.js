import {
    GET_VIDEOGAMES,
    GET_PLATFORMS,
    GET_GENRES,
    FILTER_BY_GENRE,
    FILTER_ORIGIN_CREATE,
    FILTER_BY_NAME,
    CLEAR_FILTER_BY_NAME,
    ORDER_BY_RATING,
    ORDER_BY_AZ,
    RESET_ALL,
    PAG_PENDING,
    SET_CURR_PAGE,
    POST_GAME,
    SET_LISTO_MOSTRAR,
    SET_ERROR_MSG,
    RESET_FILTER_ORDER,
    REMOVE_CARD,
} from "./actions";

const initialState = {
    allVideogames: [], // están todos los videojuegos obtenidos desde el back. Sólo se actualiza cuando cambian desde la BD o si se hace búsqueda por nombre
    videogames: [], // están los videojuegos que se muestran en pantalla luego de filtros y ordenamientos
    filteredVideogames: [], // filteredVideogames: resultados de búsquedas
    genres: [], // están todos los géneros obtenidos desde el back.
    platforms: [], // están todas las plataformas obtenidos desde el back.
    filters: { // es para que la lógica de los filtros respete las combinaciones previas
        genre: "All",
        create: "All",
        rating: "",
        azza: "",
        name: "",
    },
    dataLoaded: false, // flag para saber si tengo previamente cargados los videojuegos y géneros
    curPage: '1', // recuerdo el número de página para cuando regrese a la página
    listoMostrar: false, // flag para que home refresque registros mostrando reloj
    firstLoad: 0, // contador de ocurrencias, evita el doble renderizado al comienzo
    errors: '', // guardo los mensajes de error para mostrar en la pag.
    pagPending: false, // prueba, aviso a home para que no se quivoque con la paginación
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case POST_GAME:
            return {
                ...state,
                allVideogames: [...state.allVideogames, payload],
                videogames: [...state.allVideogames, payload],
                filteredVideogames: [...state.allVideogames, payload],
                curPage: '1',
                pagPending: false,
            };
        case REMOVE_CARD:
            return {
                ...state,
                allVideogames: state.allVideogames.filter(item => item.id !== payload),
                videogames: state.videogames.filter(item => item.id !== payload),
                filteredVideogames: state.filteredVideogames.filter(item => item.id !== payload),
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
                    (state.filters.name === "") ||
                    (elem.name.toLowerCase().includes(payload.toLowerCase().trim()));
                return NameMatch && genreMatch && createMatch; // va al filtro si cumple todas las condiciones
            });
            return {
                ...state,
                videogames: filteredByName,
                filteredVideogames: filteredByName,
                curPage: '1',
                // Establezco el filtro actual para recordar al combinar con otros a futuro:
                filters: {
                    ...state.filters,
                    name: payload,
                },
            };
        case CLEAR_FILTER_BY_NAME:
            const filtered = state.allVideogames.filter((elem) => {
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
                return genreMatch && createMatch; // va al filtro si cumple ambas condiciones
            });
            return {
                ...state,
                videogames: filtered,
                filteredVideogames: filtered,
                // Establezco el filtro actual para recordar al combinar con otros a futuro:
                filters: {
                    ...state.filters,
                    name: "",
                },
            };
        case FILTER_ORIGIN_CREATE:
            const filteredByOrigin = state.allVideogames.filter((elem) => {
                // Respeto el tipo de filtro de género existente:
                const genreMatch =
                    (state.filters.genre === "All") ||
                    elem.Genres?.some((genre) => genre.name === state.filters.genre) ||
                    elem.Genres?.some((genre) => genre === state.filters.genre);
                // Respeto el filtro de nombre existente:
                const NameMatch =
                    (state.filters.name === "") ||
                    (elem.name.toLowerCase().includes(state.filters.name.toLowerCase().trim()));
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
            const filteredByGenre = state.allVideogames.filter((elem) => {
                // Respeto el origin existente. True -> DB, False -> API:
                const createMatch =
                    state.filters.create === "All" ||
                    (state.filters.create === "True" && elem.OriginDB) ||
                    (state.filters.create === "False" && !elem.OriginDB);
                // Respeto el filtro de nombre existente:
                const NameMatch =
                    (state.filters.name === "") ||
                    (elem.name.toLowerCase().includes(state.filters.name.toLowerCase().trim()));
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
                curPage: '1',
                pagPending: false,
                filters: {
                    ...state.filters,
                    genre: "All",
                    create: "All",
                    rating: "",
                    azza: "",
                    name: "",
                },
            };
        case SET_CURR_PAGE:
            return {
                ...state,
                curPage: payload,
            };
        case PAG_PENDING:
            // Avisa a home que debe establecer la página
            return {
                ...state,
                pagPending: payload,
            }
        case RESET_ALL:
            return initialState;
        default:
            return { ...state };
    }
};

export default rootReducer;