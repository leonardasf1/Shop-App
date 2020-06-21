import { setPath } from '../redux/appReducer'

export function routing() {
    return dispatch => {
        if (window.location.hash) dispatch(setPath());

        window.addEventListener(
            'hashchange', () => { dispatch(setPath()) }
        );
    }
}