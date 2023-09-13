import React from 'react'
import Button from '@mui/material/Button';
import colortheme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';

export const Recipe = ({ recipe }) => {
  return (
    <>
    <ThemeProvider theme={colortheme}>
        <div className="container tw-flex tw-p-[1rem] tw-justify-between tw-border-b-[1px] tw-border-slate-500 tw-border-dashed">
            <div className="m tw-flex tw-flex-col">
                <h3 className='tw-text-[1.2rem]'>{recipe.title}</h3>
                <p className='tw-text-[0.8rem] tw-mb-[1rem]'><strong>Missing Ingredients: </strong>{recipe.missedIngredients.length !== 0 ? ''+recipe.missedIngredients.map((ing) => ing.name): 'None'}</p>
                <Button variant="contained" sx={{width: '100px', height: '20px', fontSize: '10px', boxShadow: 'none', borderRadius: '8px'}} color='orange'>Save</Button>
            </div>
            <img src={recipe.image} alt="" className='tw-w-[100px] tw-h-[100px]'/>
        </div>

    
    </ThemeProvider>
    </>
    
  )
}
