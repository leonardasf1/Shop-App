import { ROUTE_PATH } from "../redux/types";

export function routing() {
    return dispatch => {
        if (window.location.hash) dispatch(setPath());

        window.addEventListener(
            'hashchange', () => { dispatch(setPath()) }
        );
    }
}

function setPath() {
    return {
        type: ROUTE_PATH,
        payload: window.location.hash
    }
}