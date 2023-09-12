import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from 'redux'; // Import combineReducers
import { ingredientReducer } from "./reducers/ingredientReducer";
import { favouriteReducer } from './reducers/favouriteReducer';
import { authReducer } from './reducers/authReducer';

// Combine the reducers
const rootReducer = combineReducers({
  ingredientReducer,
  favouriteReducer,
  authReducer,
});

const store = configureStore({
  reducer: rootReducer, 
}, composeWithDevTools(applyMiddleware(thunk)));

export default store;
