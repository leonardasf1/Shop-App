const CART_ADD = 'CART/CART_ADD'
const CART_DEL = 'CART/CART_DEL'
const CART_PLUS = 'CART/CART_PLUS'
const CART_MINUS = 'CART/CART_MINUS'
const CART_CHANGE = 'CART/CART_CHANGE'
const CART_CLEAR = 'CART/CART_CLEAR'
const ORDER_INFO = 'CART/ORDER_INFO'

const initialState = {
    cartProds: sessionStorage.cartProds ?
        JSON.parse(sessionStorage.cartProds) : [],
    orderInfo: sessionStorage.orderInfo ?
        JSON.parse(sessionStorage.orderInfo) : []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case CART_ADD:
            return { ...state,
                cartProds: action.payload }

        case CART_DEL:
            return { ...state,
                cartProds: state.cartProds
                .filter( elem => elem !== action.payload ) }

        case CART_PLUS:
            return { ...state,
                cartProds: state.cartProds
                .map( elem => {
                    if (elem.id === action.payload) elem.count++
                    return elem
                } ) }

        case CART_MINUS:
            return { ...state,
                cartProds: state.cartProds
                .map( elem => {
                    if (elem.id === action.payload && elem.count >= 1) elem.count--
                    return elem
                } ) }

        case CART_CHANGE:
            return { ...state,
                cartProds: state.cartProds
                .map( elem => {
                    if ( elem.id === action.payload[0] &&
                        +action.payload[1] >= 0 ) {
                        elem.count = +action.payload[1]
                    }
                    return elem
                } ) }
        
        case CART_CLEAR:
            return { ...state,
                cartProds: [],
                orderInfo: []
            }
        case ORDER_INFO:
            let info = state.orderInfo[0] || {}

            info[action.payload[0]] = action.payload[1]

            sessionStorage.setItem(
                "orderInfo", JSON.stringify(Array(info))
            ) // уже пробовал убрать
            return { ...state,
                orderInfo: Array(info)
            }

        default: return state
    }
}

// ACTIONS -----------------------------------------------------

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
export function saveOrderInfo(e) {
    return {
        type: ORDER_INFO,
        payload: [e.target.name, e.target.value]
    }
}
export function clearOrderState() {
    return {
        type: CART_CLEAR
    }
}