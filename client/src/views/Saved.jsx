/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useGetRecipe } from '../hooks/recipe/getRecipe'

export const Saved = () => {

  const url = "/recipe"
  const email = useSelector((state) => state.authReducer.userEmail[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [info, setInfo] = useState([])

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
    <div></div>
  )
}
