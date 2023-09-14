import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Footer } from '../components/Footer';
import { Button } from '@mui/material';
import colortheme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';

export const RecipePage = () => {
    
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [info, setInfo] = useState([])

    useEffect(() => {
        async function fetchData() {
          try {
            setLoading(true)
            const response = await axios.get('/api/recipeInfo', {
              params: {
                id: id, 
              },
            });
            setInfo(response.data);
            console.log(response.data)
            setLoading(false)
          } catch (error) {
            console.error(error);
            setError(error)
          }
        }
    
        fetchData();
      }, []);


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
                <div className="instructions tw-pt-[1.5rem] ">
                    <p>{info.instructions}</p>
                </div>
                <div className="savebutton tw-pt-[1.5rem] tw-pb-[2rem] tw-w-screen tw-flex tw-justify-center">
                    <Button sx={{boxShadow: 'none'}} variant="contained" color='orange' className='tw-w-[100px] tw-h-[20px] tw-text-[10px] tw-rounded-[8px] md:tw-h-[50px] md:tw-w-[150px] '>Save Recipe</Button>

                </div>
               
            </div>
            <Footer />

            </>}


        </ThemeProvider>
       
    
    </>
    
    )
}
