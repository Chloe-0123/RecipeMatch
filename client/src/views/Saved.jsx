/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useGetRecipe } from '../hooks/recipe/getRecipe'
import { ThemeProvider } from '@emotion/react'
import colortheme from '../theme/theme'
import { Link } from 'react-router-dom'
import { SavedRecipe } from '../components/Recipe'
import { Footer } from '../components/Footer';

export const Saved = () => {

  const url = "/recipe"
  const email = useSelector((state) => state.authReducer.userEmail[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [info, setInfo] = useState()

  useEffect(() => {
    async function fetchData() {
      console.log(email)
      try {
        setLoading(true)
        const response = await useGetRecipe(url, {userEmail: email});
        setInfo(response.data);
        console.log(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error);
        setError(error)
      }
    }

    fetchData()
  },[])


  return (
    <>
    {error && <div>Error</div>}
    {loading && <div>Loading...</div>}
    <div className="tw-bg-[url('../public/imgs/yellow.png')] tw-bg-bottom md:tw-flex md:tw-flex-col md:tw-items-center md:tw-min-h-screen md:tw-pb-[2rem]">
      <h1 className="tw-pt-[5rem] tw-pb-[3rem] tw-text-[1.5rem] tw-text-center md:tw-text-[2.5rem]">Saved Recipes</h1>
      <div className=' md:tw-flex md:tw-flex-col md:tw-items-center md:tw-flex-wrap md:tw-w-[60%] md:tw-gap-[1rem]'>
          {info && info.length !== 0? info.map((recipe) => <SavedRecipe recipe={recipe}/>) : "No Recipes Saved Yet!"}
      </div>
      

    </div>
      
   
    <Footer />
    </>
  )
}
