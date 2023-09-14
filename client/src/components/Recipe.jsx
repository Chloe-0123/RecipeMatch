import React from 'react'
import Button from '@mui/material/Button';
import colortheme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom';

export const Recipe = ({ recipe }) => {
  return (
    <>
    <ThemeProvider theme={colortheme}>
        <div className="container tw-flex tw-p-[1rem] tw-justify-between tw-border-b-[1px] tw-border-slate-500 tw-border-dashed md:tw-justify-center">
            <div className="m tw-flex tw-flex-col md:tw-w-[50%]">
                <Link to={`/recipePage/${recipe.id}`}>
                    <h3 className='tw-text-[1.2rem] md:tw-text-[1.6rem]'>{recipe.title}</h3>
                </Link>
                <p className='tw-text-[0.8rem] tw-mb-[1rem] md:tw-text-[1rem]'><strong>Missing Ingredients: </strong>{recipe.missedIngredients.length !== 0 ? ''+recipe.missedIngredients.map((ing) => ing.name): 'None'}</p>
                <Button sx={{boxShadow: 'none'}} variant="contained" color='orange' className='tw-w-[100px] tw-h-[20px] tw-text-[10px] tw-rounded-[8px] md:tw-h-[30px]'>Save</Button>
            </div>
            <img src={recipe.image} alt="" className='tw-w-[100px] tw-h-[100px] md:tw-w-[150px] md:tw-h-[150px]'/>
        </div>

    
    </ThemeProvider>
    </>
    
  )
}
