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
import { Header } from './components/Header';
import colortheme from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Avatar } from '@mui/material';
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addIngredient, deleteIngredient } from './actions';
import { useSelector } from 'react-redux';

function App() {
  const [ingredients, setIngredients] = useState([])
  const [searchTerm, setSearchTerm] = useState([])
  const ingredientList = useSelector((state) => state.ingredientsList)


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

  
  function handleScroll() {
    const element = document.getElementById('fridge');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const sizetheme = useTheme();
  const sm = useMediaQuery(sizetheme.breakpoints.down('sm'));
  const md = useMediaQuery(sizetheme.breakpoints.between('md', 'lg'));
  const lg = useMediaQuery(sizetheme.breakpoints.up('xl'));

  const dispatch = useDispatch()
  const inputRef = useRef(null);

  function onBoxClick(event, label) {
    if (event.target.checked) {
      dispatch(addIngredient(label))
    } else {
      dispatch(deleteIngredient(label))
    }
  }

  console.log(ingredientList)

  return (
    <>
    <Header />
    <ThemeProvider theme={colortheme}>
    <div className="main tw-h-[calc(100vh)] tw-bg-[url('../public/imgs/yellow.png')] md:tw-bg-auto md:tw-mt-0 md:tw-bg-[url('../public/imgs/page1-1.jpg')]  md:tw-bg-no-repeat tw-scroll-smooth md:tw-bg-bottom">
      <div className="text tw-w-[100%] tw-h-[30%] tw-flex tw-flex-col tw-justify-end tw-items-center">
        <p className='tw-text-[1rem] sm:tw-text-[1.5rem]'>Find your recipes with</p>
        <p className='tw-text-[2rem] sm:tw-text-[4rem]'>RecipeMatch</p>
      </div>
      <div className="desc tw-left-[32%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-pt-[15rem]">
        <div className="foodpic tw-flex md:tw-gap-4 tw-flex-wrap tw-w-[100%] tw-justify-center md:tw-pb-8">
          <Avatar alt="Remy Sharp" src="/imgs/tacos.jpg" sx={{width: '60px', height: '60px'}}/>
          <Avatar alt="Remy Sharp" src="/imgs/bowl.jpg" sx={{width: '60px', height: '60px'}}/>
          <Avatar alt="Remy Sharp" src="/imgs/noodles.jpg" sx={{width: '60px', height: '60px'}}/>
          <Avatar alt="Remy Sharp" src="/imgs/salad.jpg" sx={{width: '60px', height: '60px'}}/>
          <Avatar alt="Remy Sharp" src="/imgs/pasta.jpg" sx={{width: '60px', height: '60px'}}/>
        </div>
        <p className='tw-text-[1rem] md:tw-text-[2rem]'>Don't know what to make for dinner?</p>
        <p>Tell us what's in your fridge!</p>
        <div className="button tw-pt-8">
          {!sm ? <Button variant="contained" color='black' onClick={handleScroll}><p>Find my recipes</p></Button> : <Button variant="contained" color='grey' onClick={handleScroll}>Find my recipes</Button>}
        </div>
        
      </div>

    </div>
    <div className="instruction tw-bg-[url('../public/imgs/yellow.png')] tw-min-h-screen" id='fridge'>
      <h2 className='tw-text-center tw-pt-16'>What's in your fridge?</h2>
      <h3 className='tw-text-center tw-pb-8'>You can choose from our list of essential ingredients, or use the search bar to add ingredients!</h3>
      <div className="tw-bg-top md:tw-flex md:tw-gap-[3%]">
        <div className="searchbar tw-pt-32 md:tw-w-[30%]">
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
        <div className='tw-w-[100%] md:tw-w-[30%] tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center'>
          <Accordion style={{ borderRadius: '10px', opacity: '0.8', backgroundColor: '#FFC6AC', width: '100%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Absolute Essentials</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <FormGroup color='grey'>
                  <div className="essentials tw-flex tw-flex-wrap opacity: '1'">
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "salt and pepper")}/>} label="salt and pepper" iconStyle={{fill: 'grey'}}/>
                    <FormControlLabel control={<Checkbox color="grey"/>} label="olive oil" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="vegetable oil" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="flour" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="unbleached all purpose flour" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="sugar" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius: '10px', opacity: '0.8', backgroundColor: '#FFC6AC', width: '100%'}}>
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
                    <FormControlLabel control={<Checkbox color="grey"/>} label="chicken broth" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="chicken stock" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="beef broth" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="beef stock" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="canned tomato sauce" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="canned tomatoes" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="tomato paste" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="marinara sauce" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="canned tuna" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius: '10px', opacity: '0.8', backgroundColor: '#FFC6AC', width: '100%'}}>
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
                    <FormControlLabel control={<Checkbox color="grey"/>} label="pasta" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="rice" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="lentils" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="breadcrumbs" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius: '10px', opacity: '0.8', backgroundColor: '#FFC6AC', width: '100%'}}>
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
                    <FormControlLabel control={<Checkbox color="grey"/>} label="potato" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="onion" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="garlic" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius: '10px', opacity: '0.8', backgroundColor: '#FFC6AC', width: '100%'}}>
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
                    <FormControlLabel control={<Checkbox color="grey"/>} label="balsamic viengar" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="distilled white vinegar" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="soy sauce" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="hot sauce" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius: '10px', opacity: '0.8', backgroundColor: '#FFC6AC', width: '100%'}}>
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
                    <FormControlLabel control={<Checkbox color="grey"/>} label="dried basil" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="red pepper flakes" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="curry powder" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="chili powder" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="garlic powder" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="onion powder" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="oregano" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="paprike" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="dried parsley" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius: '10px', opacity: '0.8', backgroundColor: '#FFC6AC', width: '100%'}}>
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
                    <FormControlLabel control={<Checkbox color="grey"/>} label="egg" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="milk" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="butter" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="ketchup" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="mayonnaise" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="mustard" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="parmesan" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{borderRadius: '10px', opacity: '0.8', backgroundColor: '#FFC6AC', width: '100%'}}>
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
                    <FormControlLabel control={<Checkbox color="grey"/>} label="hot dogs" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="real bacon pieces" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="beef" />
                    <FormControlLabel control={<Checkbox color="grey"/>} label="chicken breast" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="myfridge md:tw-w-[30%]">
          <h3>My Fridge</h3>
          <div className="current md:tw-w-[100%] tw-border-2 tw-border-[#C4C1A4] tw-rounded-[10px] tw-h-[60vh]">
          {ingredientList && ingredientList.map(ingredient => (
            <li key={ingredient}>{ingredient.text}</li>
          ))}
          </div>
        </div>
        
      </div>
    </div>

    </ThemeProvider>
   
   
   
   
    </>
  );
}

export default App;
