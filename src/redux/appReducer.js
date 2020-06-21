const SHOW_LOADER = 'APP/SHOW_LOADER'
const HIDE_LOADER = 'APP/HIDE_LOADER'
const SHOW_ALERT = 'APP/SHOW_ALERT'
const HIDE_ALERT = 'APP/HIDE_ALERT'

const ROUTE_PATH = 'APP/ROUTE_PATH'
const AUTH_EMAIL = 'APP/AUTH_EMAIL'

const FETCH_ORDERS = 'APP/FETCH_ORDERS'

const initialState = {
    loading: true,
    alert: null,
    route: '',
    auth: sessionStorage.auth ?
    JSON.parse(sessionStorage.auth) : false,
    orders: []
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case SHOW_LOADER: return {...state, loading: true}
        case HIDE_LOADER: return {...state, loading: false}

        case SHOW_ALERT: return {...state, alert: action.payload}
        case HIDE_ALERT: return {...state, alert: null}

        case ROUTE_PATH: return {...state, route: action.payload}
        case AUTH_EMAIL: return {...state, auth: action.payload}
        
        case FETCH_ORDERS: return {...state, orders: action.payload}

        default: return state
    }
}

// ACTIONS --------------------------------------------------

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}
export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}
export function showAlert(text) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        })
        setTimeout(() => {
            dispatch(hideAlert())
        }, 3000)
    }
}
export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function authAction(authObj) {
    return {
        type: AUTH_EMAIL,
        payload: authObj
    }
}

export function deleteAuth() {
    return {
        type: AUTH_EMAIL,
        payload: false
    }
}

export function setOrders(json) {
    return {
        type: FETCH_ORDERS,
        payload: Object.keys(json).map(
            key => ({ ...json[key], id: key })
        ).reverse()
    }
}

export function setPath() {
    return {
        type: ROUTE_PATH,
        payload: window.location.hash
    }
}