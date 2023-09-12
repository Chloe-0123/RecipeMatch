import React, { useState } from 'react'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import colortheme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';
import { Button } from '@mui/material';

export const Login = () => {

  const [formData, setFormData] = useState({
    username: "",
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

  console.log(formData)

  function handleSubmit() {
    
    console.log('SUBMITTED')
  }
  return (
  
    <>
    <ThemeProvider theme={colortheme}>
    <div className="loginform tw-h-screen tw-bg-[url('../public/imgs/page1.png')] tw-bg-center">
      <h1 className="tw-text-center tw-pt-[4rem] tw-text-[4rem]">Log In</h1>
      <Container>
        <form onSubmit={handleSubmit} className='tw-flex tw-flex-col tw-items-center tw-pt-[4rem]'>
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

