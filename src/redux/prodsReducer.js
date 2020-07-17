const LAST_PRODS = 'PRODS/LAST_PRODS'
const MORE_PRODS = 'PRODS/MORE_PRODS'
const SEPARATE_PRODS = 'PRODS/SEPARATE_PRODS'
const REWIEWS = 'PRODS/REWIEWS'

const initialState = {
    lastProds: [],
    separateProds: [],
    rewiews: []
}

export const prodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LAST_PRODS:
            return { ...state,
                lastProds: action.payload }

        case MORE_PRODS:
            return { ...state,
                lastProds:  [...action.payload, ...state.lastProds] }

        case SEPARATE_PRODS:
            return { ...state,
                separateProds:  [...action.payload, ...state.separateProds] }

        case REWIEWS:
            return { ...state,
                rewiews:  action.payload }

        default: return state
    }
}

// ACTIONS -----------------------------------------------------

export function setLastProds(json) {
    return {
        type: LAST_PRODS,
        payload: jsonToArr(json)
    }
}

export function setMoreProds(json) {
    return {
        type: MORE_PRODS,
        payload: jsonToArr(json)
    }
}

export function setSeparateProds(json) {
    return {
        type: SEPARATE_PRODS,
        payload: jsonToArr(json)
    }
}

export function setRewiews(json) {
    return {
        type: REWIEWS,
        payload: jsonToArr(json)
    }
}

// scripts ------------------------------------------------- 

export function jsonToArr(json) {
    return Object.keys(json)
    .map( key => ({ ...json[key], id: key }))
}