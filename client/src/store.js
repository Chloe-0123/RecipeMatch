import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ingredientReducer } from "./reducers/ingredientReducer";
import { favouriteReducer } from './reducers/favouriteReducer';

const store = configureStore(
    {reducer: ingredientReducer, favouriteReducer},
    composeWithDevTools(applyMiddleware(thunk))
  );

export default store
