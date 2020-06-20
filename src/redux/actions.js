import {
    SHOW_LOADER, HIDE_LOADER,
    SHOW_ALERT, HIDE_ALERT,
    AUTH_EMAIL,
    FETCH_ORDERS} from "./types";

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

// export function getNewProds(prod) {
//     return {
//         type: ADMIN_PRODS,
//         payload: prod
//     }
// }

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