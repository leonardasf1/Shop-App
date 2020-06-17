import { 
    FETCH_PRODS, MORE_PRODS,
    CART_ADD, CART_DEL,
    CART_PLUS, CART_MINUS, CART_CHANGE,
    SHOW_LOADER, HIDE_LOADER,
    SHOW_ALERT, HIDE_ALERT,
    AUTH_EMAIL,
    ORDER_INFO,
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

export function setProds(json) {
    return {
        type: FETCH_PRODS,
        payload: Object.keys(json).map(
            key => ({ ...json[key], id: key })
        )
    }
}

export function setMoreProds(json) {
    return {
        type: MORE_PRODS,
        payload: Object.keys(json).map(
            key => ({ ...json[key], id: key })
        )
    }
}

// export function getNewProds(prod) {
//     return {
//         type: ADMIN_PRODS,
//         payload: prod
//     }
// }

export function addToCart(prodForCart, cartProds) {
    if ( prodForCart.id ) {
        return {
            type: CART_ADD,
            payload: [...cartProds, prodForCart ]
        }
    } else {
        return {
            type: CART_ADD,
            payload: cartProds
        }
    }
}

export function changeProdCount(id, value) {
    return {
        type: CART_CHANGE,
        payload: [id, value]
    }
}

export function countPlus(id) {
    return {
        type: CART_PLUS,
        payload: id
    }
}

export function countMinus(id) {
    return {
        type: CART_MINUS,
        payload: id
    }
}

export function deleteFromCart(product) {
    return {
        type: CART_DEL,
        payload: product
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

export function saveOrderInfo(e) {
    return {
        type: ORDER_INFO,
        payload: [e.target.name, e.target.value]
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