import '../App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';


export const RecipeResults = () =>  {
    const [recipes, setRecipes] = useState([]);
    const ingredientList = useSelector((state) => state.ingredientsList)
    const myList = ingredientList.map(ingredient => ingredient.text).toString()
    


    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('/api/recipes', {
            params: {
              ingredients: `${myList}&number=10`, // Replace with user's input
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
          
          <p>{recipes.length === 0 ?  "Loading..." : recipes[0].title}</p>
        </header>
      </div>
    );
}
