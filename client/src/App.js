import './App.css';
import React from 'react'
import { useState } from 'react';
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
                <FormControlLabel control={<Checkbox/>} label="salt and pepper" />
                <FormControlLabel control={<Checkbox/>} label="olive oil" />
                <FormControlLabel control={<Checkbox/>} label="vegetable oil" />
                <FormControlLabel control={<Checkbox/>} label="flour" />
                <FormControlLabel control={<Checkbox/>} label="unbleached all purpose flour" />
                <FormControlLabel control={<Checkbox/>} label="sugar" />
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
          <Typography>Canned Goods</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
              <div className="essentials tw-flex tw-flex-wrap">
                <FormControlLabel control={<Checkbox/>} label="chicken broth" />
                <FormControlLabel control={<Checkbox/>} label="chicken stock" />
                <FormControlLabel control={<Checkbox/>} label="beef broth" />
                <FormControlLabel control={<Checkbox/>} label="beef stock" />
                <FormControlLabel control={<Checkbox/>} label="canned tomato sauce" />
                <FormControlLabel control={<Checkbox/>} label="canned tomatoes" />
                <FormControlLabel control={<Checkbox/>} label="tomato paste" />
                <FormControlLabel control={<Checkbox/>} label="marinara sauce" />
                <FormControlLabel control={<Checkbox/>} label="canned tuna" />
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
          <Typography>Starches/ Dry Goods</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
              <div className="essentials tw-flex tw-flex-wrap">
                <FormControlLabel control={<Checkbox/>} label="pasta" />
                <FormControlLabel control={<Checkbox/>} label="rice" />
                <FormControlLabel control={<Checkbox/>} label="lentils" />
                <FormControlLabel control={<Checkbox/>} label="breadcrumbs" />
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
          <Typography>Essential Vegetables</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
              <div className="essentials tw-flex tw-flex-wrap">
                <FormControlLabel control={<Checkbox/>} label="potato" />
                <FormControlLabel control={<Checkbox/>} label="onion" />
                <FormControlLabel control={<Checkbox/>} label="garlic" />
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
          <Typography>Condiments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
              <div className="essentials tw-flex tw-flex-wrap">
                <FormControlLabel control={<Checkbox/>} label="balsamic viengar" />
                <FormControlLabel control={<Checkbox/>} label="distilled white vinegar" />
                <FormControlLabel control={<Checkbox/>} label="soy sauce" />
                <FormControlLabel control={<Checkbox/>} label="hot sauce" />
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
          <Typography>Spices</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
              <div className="essentials tw-flex tw-flex-wrap">
                <FormControlLabel control={<Checkbox/>} label="dried basil" />
                <FormControlLabel control={<Checkbox/>} label="red pepper flakes" />
                <FormControlLabel control={<Checkbox/>} label="curry powder" />
                <FormControlLabel control={<Checkbox/>} label="chili powder" />
                <FormControlLabel control={<Checkbox/>} label="garlic powder" />
                <FormControlLabel control={<Checkbox/>} label="onion powder" />
                <FormControlLabel control={<Checkbox/>} label="oregano" />
                <FormControlLabel control={<Checkbox/>} label="paprike" />
                <FormControlLabel control={<Checkbox/>} label="dried parsley" />
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
          <Typography>Fridge Items</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
              <div className="essentials tw-flex tw-flex-wrap">
                <FormControlLabel control={<Checkbox/>} label="egg" />
                <FormControlLabel control={<Checkbox/>} label="milk" />
                <FormControlLabel control={<Checkbox/>} label="butter" />
                <FormControlLabel control={<Checkbox/>} label="ketchup" />
                <FormControlLabel control={<Checkbox/>} label="mayonnaise" />
                <FormControlLabel control={<Checkbox/>} label="mustard" />
                <FormControlLabel control={<Checkbox/>} label="parmesan" />
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
          <Typography>Protein</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
              <div className="essentials tw-flex tw-flex-wrap">
                <FormControlLabel control={<Checkbox/>} label="hot dogs" />
                <FormControlLabel control={<Checkbox/>} label="real bacon pieces" />
                <FormControlLabel control={<Checkbox/>} label="beef" />
                <FormControlLabel control={<Checkbox/>} label="chicken breast" />
              </div>
            </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
   
    </>
  );
}

export default App;
