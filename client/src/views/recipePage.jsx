/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Footer } from '../components/Footer';
import { Button } from '@mui/material';
import colortheme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { useSaveRecipe } from '../hooks/recipe/saveRecipe';

export const RecipePage = () => {
    
    const userId = useSelector((state) => state.authReducer.userEmail)
    const navigate = useNavigate
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [info, setInfo] = useState([])
    const url = "/recipe"

    useEffect(() => {
        async function fetchData() {
          try {
            setLoading(true)
            const apiKey = process.env.REACT_APP_API_KEY
            const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
            console.log(apiUrl)
            const response = await fetch(apiUrl);
            const data = await response.json();
            setInfo(data)
            setLoading(false)
          } catch (error) {
            console.error(error);
            setError(error)
          }
        }
    
        fetchData();
      }, []);

      const handleSave = async (title, image) => {
        if (userId === "") {
          navigate('/login')
        } else {
    
          const info = { userEmail: userId[0], recipeId: id, recipeTitle: title, recipeImage: image }
    
          try {
            const result = await useSaveRecipe(url, info)
            console.log('result', result);
            if (result === null || result.status !== 201) {
                setError(true);
            }
            else {
                alert('Successfully Saved!')
            }
          } catch (error) {
            
          }
    
        }
      }
    return (<>
        <ThemeProvider theme={colortheme}>
            {error && <div>Error</div>}
            {loading && <div>loading</div>}
            {info.length !== 0 && <>

            <div className="container tw-bg-[url('../public/imgs/yellow.png')] tw-pt-[5rem] tw-px-[1rem] md:tw-px-[3rem] md:tw-pt-[2rem] tw-flex tw-flex-col tw-items-center">
                <h1 className='tw-text-[1.5rem] tw-pb-6 md:tw-text-[2.5rem] tw-text-center'>{info.title}</h1>
                <img src={info.image} alt={`${info.title}`} className='tw-w-[150px] tw-h-[100px] md:tw-w-[300px] md:tw-h-[200px] tw-mb-6'/>
                <p dangerouslySetInnerHTML={{ __html: info.summary }}></p>
                <div className="ing tw-mt-[3rem] tw-self-start">
                    <h2 className='tw-text-[1.3rem] md:tw-text-[2rem]'>Ingredients & Instructions :</h2>
                    <ol className='tw-list-decimal tw-pl-[2rem] tw-pt-[1.5rem]'>
                        {info.extendedIngredients.map((ing) => <li>{ing.name}</li>)}
                    </ol>
                </div>
                <div className="instructions tw-pt-[1.5rem] tw-self-start">
                    <p dangerouslySetInnerHTML={{ __html: info.instructions}}></p>
                </div>
                <div className="savebutton tw-pt-[1.5rem] tw-pb-[2rem] tw-w-screen tw-flex tw-justify-center">
                    <Button sx={{boxShadow: 'none'}} variant="contained" color='orange' className='tw-w-[100px] tw-h-[20px] tw-text-[10px] tw-rounded-[8px] md:tw-h-[50px] md:tw-w-[150px]' onClick={() => handleSave(info.title, info.image)}>Save Recipe</Button>

                </div>
               
            </div>
            <Footer />

            </>}


        </ThemeProvider>
       
    
    </>
    
    )
}
