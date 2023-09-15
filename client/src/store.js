import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware , compose } from '@reduxjs/toolkit';
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

const composeEnhancers = process.env.REACT_APP_NODE_ENV === 'development' ? composeWithDevTools : compose;

const store = configureStore({
  reducer: rootReducer, 
}, composeEnhancers(applyMiddleware(thunk)));

export default store;
