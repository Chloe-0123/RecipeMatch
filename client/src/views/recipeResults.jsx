import '../App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Recipe } from '../components/Recipe';
import { Footer } from '../components/Footer';

export const RecipeResults = () =>  {
    const [recipes, setRecipes] = useState([]);
    const ingredientList = useSelector((state) => state.ingredientReducer.ingredientsList)
    const myList = ingredientList.map(ingredient => ingredient.text).toString()
    
    const [loading, setLoading] = useState(false)


    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true)
          const response = await axios.get('/api/recipes', {
            params: {
              ingredients: `${myList}&number=30&ranking=2`, // Replace with user's input
            },
          });
          setRecipes(response.data);
          setLoading(false)
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
    }, []);
  
    console.log(recipes)
  
    return (
      <>
      <div className="tw-w-screen tw-bg-[url('../public/imgs/yellow.png')]">
        <h1 className='tw-w-screen tw-pt-[4rem] tw-text-[2rem] tw-text-center'>Recipes</h1>
        <div className="">
            <p>{loading ?  "Loading..." : ''}</p>
            {recipes.length !== 0? recipes.map((recipe) => <Recipe recipe={recipe}/>) : <h1>NO RECIPES</h1>}
          
        </div>


      </div>
      <Footer />
      
      </>
     
    );
}
