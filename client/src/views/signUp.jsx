/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import colortheme from '../theme/theme'
import { Button, Container, TextField } from '@mui/material'
import { usePostUserSignUp } from '../hooks/user/userSignup'
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {

  const url = "/signUp"
  const navigate = useNavigate()
  
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (event) => {
    setFormData(prev => {
        return {
            ...prev,
            [event.target.name]: event.target.value
        }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('submitting');
    try {
        const result = await usePostUserSignUp(url, formData);
        console.log('result', result);
        if (result === null || result.status !== 200) {
            setIsError(true);
        }
        else {
            navigate("/login")
        }

    }
    catch (error) {
        setIsError(true);
        console.log("ERROR: ", error)
    }

}
  console.log(formData)

    return (
       <>
       <ThemeProvider theme={colortheme}>
       <div className="loginform tw-h-screen tw-bg-[url('../public/imgs/page1.png')] tw-bg-center">
      <h1 className="tw-text-center tw-pt-[4rem] tw-text-[4rem]">Sign Up</h1>
      <Container>
        <form onSubmit={(event) => handleSubmit(event)} className='tw-flex tw-flex-col tw-items-center tw-pt-[4rem]'>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
          color="black"
          sx={{width: '285px'}}
        />
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
          color="black"
          sx={{width: '285px'}}
        />
        <TextField
          label="Password"
          variant="outlined"
          
          margin="normal"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          color="black"
          sx={{width: '285px'}}
        />
        <Button
          type="submit"
          variant="contained"
          color="black"
          sx={{width:"285px", marginTop: "2rem"}}
        >
          Submit
        </Button>

        </form>
      </Container>

      



    </div>






       </ThemeProvider>
       </>

  )
}
