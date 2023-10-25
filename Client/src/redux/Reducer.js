import {
    GET_VIDEOGAMES,
    FILTER_BY_GENRE,
    FILTER_ORIGIN_CREATE,
    ORDER_BY_RATING,
    ORDER_BY_ALPHABET,
    RESET,
    SEARCH_BY_NAME,
    GET_GENRES,
    POST_GAME,
    GET_PLATFORMS,
    GET_VIDEOGAME_BY_ID,
    CLEAR_DETAIL
} from "./actions";

const initialState = {
    allVideogames: [],
    videogames: [],
    filteredVideogames: [],
    genres: [],
    platforms: [],
    detail: {},
    filters: {
        genre: "All",
        create: "All",
        rating: "",
        alphabet: "",
    },
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: payload,
                videogames: payload,
                filteredVideogames: payload,
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
        case FILTER_BY_GENRE:
            let filteredByGenre = state.allVideogames;
            if (payload !== "All") {
                filteredByGenre = state.allVideogames.filter((elem) => {
                    // some() verifica si al menos uno de los elementos en el arreglo cumple con la condición de que el nombre del género sea igual a payload
                    const hasGenre =
                        elem.Genres?.some((genre) => genre.name === payload) ||
                        (elem.genre && elem.genre.includes(payload));
                    return hasGenre;
                });
            }
            return {
                ...state,
                videogames: filteredByGenre,
                filteredVideoGames: filteredByGenre,
                filters: {
                    ...state.filters,
                    genre: payload,
                },
            };
        case FILTER_ORIGIN_CREATE:
            const filteredByOrigin = state.allVideogames.filter((elem) => {
                const genreMatch =
                    state.filters.genre === "All" ||
                    elem.Genres?.some((genre) => genre.name === state.filters.genre) ||
                    (elem.genre && elem.genre.includes(state.filters.genre));
                // True -> DB, False -> API
                const createMatch =
                    payload === "All" ||
                    (payload === "True" && elem.OriginDB) ||
                    (payload === "False" && !elem.OriginDB);
                return genreMatch && createMatch;
            });
            return {
                ...state,
                videoGames: filteredByOrigin,
                filteredVideoGames: filteredByOrigin,
                filters: {
                    ...state.filters,
                    create: payload,
                },
            };
        default:
            return { ...state };
    }
};
export default rootReducer;