import React from 'react'
import { Link } from '@mui/material'
import { Button } from '@mui/material'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import LoginIcon from '@mui/icons-material/Login';

export const Header = () => {
  const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    black: createColor('#000000'),
    green: createColor('#C4C1A4'),
    orange: createColor('#FFC6AC'),
    yellow: createColor('#FFF6DC'),
    grey: createColor('#9E9FA5')
  },

});

  
  return (
    <div className='tw-sticky'>
        <div className='tw-min-h-[60px] tw-flex tw-justify-between'>
          <div className="logo tw-pl-8">
            <Link href="/"><img src="imgs/cover.png" alt="RecipeMatch" className='tw-h-[60px]'/></Link>
          </div>
          <div className="right tw-flex">
            <div className="s2 tw-flex tw-items-center tw-gap-4">
            <Link href="/" underline="none" color="grey[900]">Saved Recipes</Link>
            <Link href="/" underline="none" color="grey[900]">My Fridge</Link>
            </div>
            <div className="logsign tw-flex tw-items-center tw-gap-2 tw-ml-8 tw-mr-16">
            <ThemeProvider theme={theme}>
              <Button variant="outlined" color='black'>Log In</Button>
              <Button variant="contained" color='black'><LoginIcon/> <p className='tw-ml-2'>Sign Up</p></Button>
            </ThemeProvider>
            </div>
          </div>
         

        </div>



    </div>
  )
}

