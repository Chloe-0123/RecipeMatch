import './App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

function App() {
  const [ingredients, setIngredients] = useState([])
  const [searchTerm, setSearchTerm] = useState([])


  const handleSearchInputChange = async (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    console.log(searchTerm)
    console.log(input)

    // Fetch ingredients based on user input
    try {
      const response = await axios.get('/api/ingredients', {
          params: {
            ingredient: input,
          },
        }
      );
      setIngredients(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  console.log(ingredients)
  

  

  return (
    <>
      <Button variant="contained" color="primary">
      Click me
    </Button>
    <div className="searchbar">
      <input
          type="text"
          placeholder="Search ingredients"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
    <div className='tw-w-[50%]'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Absolute Essentials</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormGroup>
              <div className="essentials tw-flex tw-flex-wrap">
                <FormControlLabel control={<Checkbox/>} label="Label" />
                <FormControlLabel control={<Checkbox/>} label="Label" />
                <FormControlLabel control={<Checkbox/>} label="Label" />
                <FormControlLabel control={<Checkbox/>} label="Label" />
                <FormControlLabel control={<Checkbox/>} label="Label" />
                <FormControlLabel control={<Checkbox/>} label="Label" />
              </div>
            </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
   
    </>
  );
}

export default App;
