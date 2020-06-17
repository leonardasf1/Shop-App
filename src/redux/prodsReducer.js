import {
    FETCH_PRODS, MORE_PRODS,
    CART_ADD, CART_DEL,
    CART_PLUS, CART_MINUS, CART_CHANGE,
    ORDER_INFO } from "./types"

const initialState = {
    fetchedProds: [],
    cartProds: sessionStorage.cartProds ?
        JSON.parse(sessionStorage.cartProds) : [],
    orderInfo: sessionStorage.orderInfo ?
        JSON.parse(sessionStorage.orderInfo) : []
}

export const prodsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case CREATE_PROD:
            // return { ...state, newProd: state.newProd.concat([action.payload]) }
            // return { ...state, newProd: [...state.newProd, action.payload] }
        case FETCH_PRODS:
            return { ...state,
                fetchedProds: action.payload}

        case MORE_PRODS:
            return { ...state,
                fetchedProds:  [...action.payload, ...state.fetchedProds] }

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
            // let info = {}
            // let neW = true
            // if (!state.orderInfo.length) {
            //     info[action.payload[0]] = action.payload[1]
            //     neW = false
            // } else {
            //     info = state.orderInfo.map(i => {
            //         if (i[0] === action.payload[0]) {
            //             i = action.payload
            //             neW = false
            //         } return i
            //     })
            // }
            // if (neW) {
            //     info = info.concat([action.payload])
            // }
            let info = state.orderInfo[0] || {}

            info[action.payload[0]] = action.payload[1]

            sessionStorage.setItem(
                "orderInfo", JSON.stringify(Array(info))
            )
            return { ...state,
                orderInfo: Array(info)
            }

        default: return state
    }
}