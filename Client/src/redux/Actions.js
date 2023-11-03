import axios from 'axios';
// constantes que previenen errores de tipeo (action -> reducer):
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const FILTER_ORIGIN_CREATE = 'FILTER_ORIGIN_CREATE'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const ORDER_BY_AZ = 'ORDER_BY_AZ'
export const RESET_ALL = 'RESET_ALL'
export const SET_CURR_PAGE = 'SET_CURR_PAGE'
export const POST_GAME = 'POST_GAME'
export const PAG_PENDING = 'PAG_PENDING'
export const SET_LISTO_MOSTRAR = 'SET_LISTO_MOSTRAR'
export const SET_ERROR_MSG = 'SET_ERROR_MSG';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const CLEAR_FILTER_BY_NAME = 'CLEAR_FILTER_BY_NAME';
export const RESET_FILTER_ORDER = 'RESET_FILTER_ORDER';
export const REMOVE_CARD = 'REMOVE_CARD';
// Variables de entorno:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const VG_V = import.meta.env.VITE_VG_VIDEOGAMES || '/videogames';
const VG_G = import.meta.env.VITE_VG_GENRES || '/genres';
const VG_P = import.meta.env.VITE_VG_PLATFORMS || '/platforms';
const VG_R = import.meta.env.VITE_VG_REMOVE || '/remove';
const VG_VIDEOGAMES = API_URL_BASE + VG_V;
const VG_GENRES = API_URL_BASE + VG_G;
const VG_PLATFORMS = API_URL_BASE + VG_P;
const VG_REMOVE = API_URL_BASE + VG_R;

export function removeCard(payload) {
    const endpoint = VG_REMOVE + "/" + payload;
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(endpoint);
            return dispatch({
                type: REMOVE_CARD,
                payload: payload,
            });
        } catch (error) {
            return dispatch({
                type: SET_ERROR_MSG,
                payload: "Error removing card: " + error.message,
            });
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
            return dispatch({
                type: SET_ERROR_MSG,
                payload: "Error fetching genres: " + error.message,
            });
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
            return dispatch({
                type: SET_ERROR_MSG,
                payload: "Error fetching platforms: " + error.message,
            });
        }
    };
}

export const getVideogames = (payload) => {
    const endpoint = VG_VIDEOGAMES + "/?source=" + payload;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: SET_ERROR_MSG,
                payload: "Error fetching videogames: " + error.message,
            });
        }
    };
}

export function setListoMostrar() {
    return {
        type: SET_LISTO_MOSTRAR,
    }
}

export function filterVideogamesByName(payload) {
    return {
        type: FILTER_BY_NAME, payload,
    }
}

export function clearFilterByName() {
    return {
        type: CLEAR_FILTER_BY_NAME,
    }
}

export function filterOriginData(payload) {
    return {
        type: FILTER_ORIGIN_CREATE, payload,
    }
}

export function filterVideogamesByGenre(payload) {
    return {
        type: FILTER_BY_GENRE, payload,
    }
}

export function orderByRating(payload) {
    return {
        type: ORDER_BY_RATING, payload,
    }
}

export function orderByAZ(payload) {
    return {
        type: ORDER_BY_AZ, payload,
    }
}

export function resetFilterAndOrder() {
    return { type: RESET_FILTER_ORDER }
}

export const postVidegame = (payload) => {
    const endpoint = VG_VIDEOGAMES;
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, payload);
            // Agreg el valor 'id' al objeto 'payload' para tener el nuevo registro
            // completo sin necesidad de hacer un llamado y que me traiga todo:
            const aux = {
                id: data.id,
                name: payload.name,
                image: payload.image,
                description: payload.description,
                released_date: payload.released_date,
                rating: payload.rating,
                Platforms: payload.platform && payload.platform.map(el => ({ name: el })),
                Genres: payload.genre && payload.genre.map(el => ({ name: el })),
                OriginDB: true,
            }
            return dispatch({
                type: POST_GAME,
                payload: aux,
            });

        } catch (error) {
            return dispatch({
                type: SET_ERROR_MSG,
                payload: "Error posting videogame: " + error.message,
            });
        }
    };
}

export function paginacionPendiente(payload) {
    return {
        type: PAG_PENDING, payload,
    }
}

export function resetAll() {
    return { type: RESET_ALL }
}

export function setCurrPage(payload) {
    return {
        type: SET_CURR_PAGE, payload,
    }
}
