import { combineReducers } from "redux";
import { prodsReducer } from "./prodsReducer";
import { cartReducer } from "./cartReducer";
import { appReducer } from "./appReducer";

export const rootReducer = combineReducers({
    prods: prodsReducer,
    cart: cartReducer,
    app: appReducer
})