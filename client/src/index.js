import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecipeResults } from './views/recipeResults'
import { Test } from './views/test';
import { Provider } from "react-redux";
import store from "./store";
import { SignUp } from './views/signUp';
import { Header } from './components/Header';
import { MyFridge } from './views/myFridge'
import { Saved } from './views/Saved'
import { Login } from './views/login'
import { RecipePage } from './views/recipePage';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.REACT_APP_NODE_ENV === 'production') disableReactDevTools()

const router = createBrowserRouter([
  { element: <Header />,
    children: [
      { path: "/", element: <App />},
      { path: "/results", element: <RecipeResults />},
      { path: "/test", element: <Test />},
      { path: "/signUp", element: <SignUp />},
      { path: "/saved", element: <Saved />},
      { path: "/myFridge", element: <MyFridge />},
      { path: "/login", element: <Login />},
      { path: "/recipePage/:id", element: <RecipePage />}
    ]}
  
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
