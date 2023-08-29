import './App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from 'lodash'; // Used for debouncing API calls

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([])
  const [searchTerm, setSearchTerm] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/recipes', {
          params: {
            ingredients: 'apple,flour,sugar&number=2', // Replace with user's input
          },
        });
        setRecipes(response.data);
       
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  const handleSearchInputChange = async (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    console.log(searchTerm)
    console.log(input)

    // Fetch ingredients based on user input
    try {
      const response = await axios.get('/api/ingredients', {
          params: {
            ingredient: input,
          },
        }
      );
      setIngredients(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  console.log(ingredients)
  

  

  return (
    <>
      <p>{recipes.length === 0 ?  "Loading..." : recipes[0].title}</p>
      <Button variant="contained" color="primary">
      Click me
    </Button>
    <div className="searchbar">
      <input
          type="text"
          placeholder="Search ingredients"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>


    </div>
   
    </>
  );
}

export default App;
