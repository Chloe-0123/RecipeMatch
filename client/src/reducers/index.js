import { favouriteReducer } from "./favouriteReducer";
import { ingredientReducer } from "./ingredientReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    ingredientReducer: ingredientReducer,
    favouriteReducer: favouriteReducer

})

export default rootReducer;