import { combineReducers } from "redux";
import { prodsReducer } from "./prodsReducer";
import { appReducer } from "./appReducer";

export const rootReducer = combineReducers({
    prods: prodsReducer,
    app: appReducer
})