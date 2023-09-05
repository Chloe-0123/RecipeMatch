import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ingredientReducer } from "./reducers/ingredientReducer";

const store = configureStore(
    {reducer: ingredientReducer},
    composeWithDevTools(applyMiddleware(thunk))
  );

export default store
