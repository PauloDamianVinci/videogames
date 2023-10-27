import axios from 'axios';
// constantes que previenen errores de tipeo (action -> reducer):
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const FILTER_ORIGIN_CREATE = 'FILTER_ORIGIN_CREATE'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const ORDER_BY_AZ = 'ORDER_BY_AZ'
export const RESET = 'RESET'
export const DATA_LOADED = 'DATA_LOADED'
export const SET_CURR_PAGE = 'SET_CURR_PAGE'
export const SET_CURR_RATING = 'SET_CURR_RATING'
export const SET_CURR_AZ = 'SET_CURR_AZ'
export const SET_CURR_GENRE = 'SET_CURR_GENRE'
export const SET_CURR_ORIGIN = 'SET_CURR_ORIGIN'
export const VG_VIDEOGAMES_BY_NAME = 'VG_VIDEOGAMES_BY_NAME'


export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'
export const POST_GAME = 'POST_GAME'
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'
// Variables de entorno:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const VG_V = import.meta.env.VITE_VG_VIDEOGAMES || '/videogames';
const VG_G = import.meta.env.VITE_VG_GENRES || '/genres';
const VG_P = import.meta.env.VITE_VG_PLATFORMS || '/platforms';
const VG_VIDEOGAMES = API_URL_BASE + VG_V;
const VG_GENRES = API_URL_BASE + VG_G;
const VG_PLATFORMS = API_URL_BASE + VG_P;

export const getVideogames = () => {
    const endpoint = VG_VIDEOGAMES + "/?source=3"; // "/?source=3" -> solicita de BD + API
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: data,
            });
        } catch (error) {
            console.error("Error fetching videogames:", error.message);
        }
    };
}

export const getVideogamesbyName = (payload) => {
    const endpoint = VG_VIDEOGAMES_BY_NAME + "/?source=" + payload;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: VG_VIDEOGAMES_BY_NAME,
                payload: data,
            });
        } catch (error) {
            console.error("Error fetching videogames by name:", error.message);
        }
    };
}

export const getGenres = () => {
    const endpoint = VG_GENRES;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_GENRES,
                payload: data,
            });
        } catch (error) {
            console.error("Error fetching genres:", error.message);
        }
    };
}

export const getPlatforms = () => {
    const endpoint = VG_PLATFORMS;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_PLATFORMS,
                payload: data,
            });
        } catch (error) {
            console.error("Error fetching platforms:", error.message);
        }
    };
}

export function filterOriginData(payload) {
    return {
        type: FILTER_ORIGIN_CREATE, payload
    }
}

export function filterVideogamesByGenre(payload) {
    return {
        type: FILTER_BY_GENRE, payload
    }
}

export function orderByRating(payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export function orderByAZ(payload) {
    return {
        type: ORDER_BY_AZ,
        payload
    }
}

export function resetFilterOrder() {
    return { type: RESET }
}

export function getVideogameById(id) {
    const endpoint = VG_VIDEOGAMES + "/" + id;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_VIDEOGAME_BY_ID,
                payload: data,
            });
        } catch (error) {
            console.error("Error fetching details:", error.message);
        }
    };
}

export function setDataLoaded(payload) {
    return {
        type: DATA_LOADED,
        payload
    }
}

export function clearDetails() {
    return {
        type: CLEAR_DETAIL,
    }
}

export function setCurrPage(payload) {
    return {
        type: SET_CURR_PAGE,
        payload
    }
}

export function setCurrRating(payload) {
    return {
        type: SET_CURR_RATING,
        payload
    }
}
export function setCurrAZ(payload) {
    return {
        type: SET_CURR_AZ,
        payload
    }
}
export function setCurrGenre(payload) {
    return {
        type: SET_CURR_GENRE,
        payload
    }
}
export function setCurrOrigin(payload) {
    return {
        type: SET_CURR_ORIGIN,
        payload
    }
}

// export function postVidegame(payload) {
//     return async function (dispatch) {
//         let json = await axios.post('http://localhost:3001/videogames', payload) // cuando quiero postear loq ue viene  como payload lo hago asi
//         return dispatch({
//             type: POST_GAME,
//             payload: json
//         })
//     }
// }

// export function getVideogameById(id) {
//     return async function (dispatch) {
//         let json = await axios.get(`http://localhost:3001/videogames/${id}`)
//         return dispatch({
//             type: GET_VIDEOGAME_BY_ID,
//             payload: json.data
//         })
//     }
// }
