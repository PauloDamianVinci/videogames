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
export const EDIT_GAME = 'EDIT_GAME';
// Variables de entorno:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const VG_R = import.meta.env.VITE_VG_REMOVE || '/remove';
const VG_REMOVE = API_URL_BASE + VG_R;

export function editVideogame(payload) {
    return {
        type: EDIT_GAME, payload,
    }
}

export function getGenres(payload) {
    return {
        type: GET_GENRES, payload,
    }
}

export function getPlatforms(payload) {
    return {
        type: GET_PLATFORMS, payload,
    }
}

export function getVideogames(payload) {
    return {
        type: GET_VIDEOGAMES, payload,
    }
}

export function showError(payload) {
    return {
        type: SET_ERROR_MSG, payload,
    }
}

export function postVidegame(payload) {
    return {
        type: POST_GAME, payload,
    }
}

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
