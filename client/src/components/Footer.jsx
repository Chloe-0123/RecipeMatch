import React from 'react'
import { Box, Container, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <div className="footer">
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#9E9FA5'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
          Copyright @Chloe Kim
          </Typography>
          
        </Container>
      </Box>

    </div>
  )
}
