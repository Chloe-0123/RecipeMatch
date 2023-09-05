import { ingredientReducer } from "./ingredientReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    ingredientReducer: ingredientReducer,
})

export default rootReducer;