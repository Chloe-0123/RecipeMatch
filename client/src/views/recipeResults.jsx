import logo from '../logo.svg';
import '../App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'


export const RecipeResults = () =>  {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('/api/recipes', {
            params: {
              ingredients: 'apple,++flour,+sugar&number=2', // Replace with user's input
            },
          });
          setRecipes(response.data);
         
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
    }, []);
  
    console.log(recipes)
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{recipes.length === 0 ?  "Loading..." : recipes[0].title}</p>
        </header>
      </div>
    );
}
