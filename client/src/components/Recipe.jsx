/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import colortheme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSaveRecipe } from '../hooks/recipe/saveRecipe';

export const Recipe = ({ recipe }) => {

  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const userId = useSelector((state) => state.authReducer.userEmail)


  const url = "/recipe"

  const handleSave = async (id) => {
    if (userId === "") {
      navigate('/login')
    } else {

      const info = { userEmail: userId[0] , recipeId: id, recipeTitle: recipe.title, recipeImage: recipe.image }

      try {
        const result = await useSaveRecipe(url, info)
        console.log('result', result);
        if (result === null || result.status !== 201) {
            setError(true);
            alert(error)
        }
        else {
            alert('Successfully Saved!')
        }
      } catch (error) {
        
      }

    }
  }


  return (
    <>
    <ThemeProvider theme={colortheme}>
        <div className="container tw-flex tw-p-[1rem] tw-justify-between tw-border-b-[1px] tw-border-slate-500 tw-border-dashed md:tw-justify-center">
            <div className="m tw-flex tw-flex-col md:tw-w-[50%]">
                <Link to={`/recipePage/${recipe.id}`}>
                    <h3 className='mont tw-text-[1.2rem] md:tw-text-[1.6rem]'>{recipe.title}</h3>
                </Link>
                <p className='tw-text-[0.8rem] tw-mb-[1rem] md:tw-text-[1rem]'><strong>Missing Ingredients: </strong>{recipe.missedIngredients.length !== 0 ? ''+recipe.missedIngredients.map((ing) => ing.name): 'None'}</p>
                <Button sx={{boxShadow: 'none'}} variant="contained" color='orange' className='tw-w-[100px] tw-h-[20px] tw-text-[10px] tw-rounded-[8px] md:tw-h-[30px]' onClick={() => handleSave(recipe.id)}>Save</Button>
            </div>
            <img src={recipe.image} alt="" className='tw-w-[100px] tw-h-[100px] md:tw-w-[150px] md:tw-h-[150px]'/>
        </div>

    
    </ThemeProvider>
    </>
    
  )
}


export const SavedRecipe = ({ recipe }) => {
  return (
    <>
     <ThemeProvider theme={colortheme}>
     <Link to={`/recipePage/${recipe.recipeId}`} className='md:tw-w-full'>
        <div className="container tw-flex tw-p-[1rem] tw-justify-between tw-border-b-[1px] tw-border-slate-500 tw-border-dashed md:tw-flex  md:tw-justify-between md:tw-border-none md:tw-w-full md:tw-gap-[2rem] md:tw-bg-[#C4C1A4]/30">
           
            
                <h3 className='tw-text-[1rem] md:tw-text-[1.5rem]'>{recipe.recipeTitle}</h3>
            
            
            <img src={recipe.recipeImage} alt="" className='tw-w-[100px] tw-h-[100px] md:tw-w-[150px] md:tw-h-[150px] md:tw-self-center'/>
        </div>
        </Link>
    
      </ThemeProvider>
    </>


  )
}