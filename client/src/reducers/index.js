import { favouriteReducer } from "./favouriteReducer";
import { ingredientReducer } from "./ingredientReducer";
import { authReducer } from "./authReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    ingredientReducer: ingredientReducer,
    favouriteReducer: favouriteReducer,
    authReducer: authReducer

})

export default rootReducer;