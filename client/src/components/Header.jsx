import React from 'react'
import { Link } from '@mui/material'
import { grey } from '@mui/material/colors'

export const Header = () => {
  return (
    <div className='tw-sticky'>
        <div className='tw-min-h-[60px]'>
          <div className="logo">
            <Link href="/"><img src="imgs/cover.png" alt="RecipeMatch" className='tw-h-[60px]'/></Link>
          </div>
          <div className="s2">
           <Link href="/"></Link>
          </div>

        </div>



    </div>
  )
}

