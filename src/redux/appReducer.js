import { 
    SHOW_LOADER, HIDE_LOADER,
    SHOW_ALERT, HIDE_ALERT,
    ROUTE_PATH, AUTH_EMAIL,
    FETCH_ORDERS } from "./types"

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