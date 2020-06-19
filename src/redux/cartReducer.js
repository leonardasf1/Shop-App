import {
    CART_ADD, CART_DEL,
    CART_PLUS, CART_MINUS, CART_CHANGE,
    ORDER_INFO } from "./types"

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
                    if (elem.id === action.payload[0] &&
                        +action.payload[1] >= 0) {
                        elem.count = +action.payload[1]
                    }
                    return elem
                } ) }

        case ORDER_INFO:
            let info = state.orderInfo[0] || {}

            info[action.payload[0]] = action.payload[1]

            sessionStorage.setItem(
                "orderInfo", JSON.stringify(Array(info))
            ) // убрать в другое место
            return { ...state,
                orderInfo: Array(info)
            }

        default: return state
    }
}