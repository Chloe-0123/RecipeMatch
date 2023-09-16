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
import colortheme from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Avatar } from '@mui/material';
import { useDispatch } from "react-redux";
import { addIngredient, deleteIngredient } from './actions';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { Footer } from './components/Footer';
import { Link } from 'react-router-dom';
import { axiosInstance } from './axios';


function App() {
  const [ingredients, setIngredients] = useState([])
  const [searchTerm, setSearchTerm] = useState([])
  const ingredientList = useSelector((state) => state.ingredientReducer.ingredientsList);

  const handleSearchInputChange = async (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    console.log(searchTerm)
    console.log(input)

    // Fetch ingredients based on user input
    try {
      const response = await axiosInstance.get('/api/ingredients', {
          params: {
            ingredient: input,
          },
        }
      );
      const responseData = response.data;
      if (Array.isArray(responseData)) {
        // Ensure that the response data is an array
        setIngredients(responseData);
      } else {
        console.error('API response is not an array:', responseData);
      }
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

  function onBoxClick(event, label) {
    if (event.target.checked) {
      dispatch(addIngredient(label))
    } else {
      dispatch(deleteIngredient(label))
    }
  }

  function handleSearchClick(name) {
    dispatch(addIngredient(name))
  }

  function onClickDelete(label) {
    dispatch(deleteIngredient(label))

  }


  console.log(ingredients)

  return (
    <>
    <ThemeProvider theme={colortheme}>
  
    <div className="main tw-min-h-screen tw-pt-[6rem] md:tw-pt-[4rem] tw-bg-[url('../public/imgs/yellow.png')] md:tw-bg-auto md:tw-mt-0 md:tw-bg-[url('../public/imgs/page1-1.jpg')]  md:tw-bg-no-repeat tw-scroll-smooth md:tw-bg-bottom md:tw-bg-cover lg:tw-bg-auto">
      <div className="text tw-w-[100%] tw-h-[30%] tw-flex tw-flex-col tw-justify-end tw-items-center">
        <p className=' mont tw-text-[1.2rem] sm:tw-text-[1.5rem] md:tw-text-[1.6rem]'>Find your recipes with</p>
        <p className=' tw-text-[2.5rem] sm:tw-text-[4rem] md:tw-text-[4.3rem]'>RecipeMatch</p>
      </div>
      <div className="desc tw-left-[32%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-pt-[15rem]">
        <div className="foodpic tw-flex md:tw-gap-4 tw-flex-wrap tw-w-[100%] tw-justify-center md:tw-pb-8">
          <Avatar alt="Remy Sharp" src="/imgs/tacos.jpg" sx={{width: '60px', height: '60px'}}/>
          <Avatar alt="Remy Sharp" src="/imgs/bowl.jpg" sx={{width: '60px', height: '60px'}}/>
          <Avatar alt="Remy Sharp" src="/imgs/noodles.jpg" sx={{width: '60px', height: '60px'}}/>
          <Avatar alt="Remy Sharp" src="/imgs/salad.jpg" sx={{width: '60px', height: '60px'}}/>
          <Avatar alt="Remy Sharp" src="/imgs/pasta.jpg" sx={{width: '60px', height: '60px'}}/>
        </div>
        <p className='mont tw-text-[1.2rem] md:tw-text-[1.5rem] tw-mt-4 tw-text-center'>Don't know what to make for dinner?</p>
        <p className='mont tw-text-[1.4rem]'>Tell us what's in your fridge!</p>
        <div className="button tw-pt-8">
          {!sm ? <Button variant="contained" color='black' onClick={handleScroll}><p>Find my recipes</p></Button> : <Button variant="contained" color='grey' onClick={handleScroll}>Find my recipes</Button>}
        </div>
        
      </div>

    </div>
    <div className="instruction tw-bg-[url('../public/imgs/yellow.png')] tw-min-h-screen tw-py-8 tw-px-2" id='fridge'>
      <h2 className='mont tw-text-center tw-pt-16 tw-text-[1.5rem] md:tw-text-[2rem] tw-font-semibold'>What's in your fridge?</h2>
      <h3 className='mont tw-text-center tw-pb-8 md:tw-text-[1.3rem]'>You can choose from our list of essential ingredients, or use the search bar to add ingredients!</h3>
      <div className="tw-bg-top md:tw-flex md:tw-gap-[3%] tw-pb-4">
        <div className="searchbar md:tw-w-[30%] md:tw-pl-8">
          <h3 className='tw-mb-4 md:tw-text-[1.3rem]'>Search Ingredients</h3>
            <input
                type="text"
                placeholder="Search ingredients"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className='tw-border-b-2 tw-bg-transparent tw-border-black tw-w-full tw-outline-0'
              />
              <ul className='tw-bg-white'>
              {Array.isArray(ingredients) ? ingredients.length !== 0 && ingredients.map((ingredient) => (<>
                  <ListItem>
                    <button onClick={() => handleSearchClick(ingredient.name)} className='tw-w-full tw-text-left'>
                      <ListItemText
                        primary={`${ingredient.name}`}
                        secondary= ''
                      />
                    </button>
                  </ListItem></>
              )) : console.log('NOT AN ARRAY')}
            </ul>
        </div>
        <div className='tw-w-[100%] md:tw-w-[30%] tw-flex tw-flex-col tw-gap-2 tw-items-center '>
          <h3 className='tw-self-start md:tw-text-[1.3rem]'>Choose Ingredients</h3>
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
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "olive oil")}/>} label="olive oil" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "vegetable oil")}/>} label="vegetable oil" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "flour")}/>} label="flour" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "unbleached all purpose flour")}/>} label="unbleached all purpose flour" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "sugar")}/>} label="sugar" />
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
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "chicken broth")}/>} label="chicken broth" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "chicken stock")}/>} label="chicken stock" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "beef broth")}/>} label="beef broth"/>
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "beef stock")}/>} label="beef stock" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "canned tomato sauce")}/>} label="canned tomato sauce" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "canned tomatoes")}/>} label="canned tomatoes" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "tomato paste")}/>} label="tomato paste" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "marinara sauce")}/>} label="marinara sauce" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "canned tuna")}/>} label="canned tuna" />
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
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "pasta")}/>} label="pasta" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "rice")}/>} label="rice" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "lentils")}/>} label="lentils" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "breadcrumbs")}/>} label="breadcrumbs" />
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
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "potato")}/>} label="potato" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "onion")}/>} label="onion" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "garlic")}/>} label="garlic" />
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
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "balsamic vinegar")}/>} label="balsamic vinegar" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "distilled white vinegar")}/>} label="distilled white vinegar" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "soy sauce")}/>} label="soy sauce" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "hot sauce")}/>} label="hot sauce" />
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
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "dried basil")}/>} label="dried basil" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "red pepper flakes")}/>} label="red pepper flakes" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "curry powder")}/>} label="curry powder" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "chili powder")}/>} label="chili powder" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "garlic powder")}/>} label="garlic powder" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "onion powder")}/>} label="onion powder" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "oregano")}/>} label="oregano" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "paprike")}/>} label="paprike" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "dried parsley")}/>} label="dried parsley" />
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
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "egg")}/>} label="egg" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "milk")}/>} label="milk" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "butter")}/>} label="butter" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "ketchup")}/>} label="ketchup" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "mayonnaise")}/>} label="mayonnaise" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "mustard")}/>} label="mustard" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "parmesan")}/>} label="parmesan" />
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
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "hot dogs")}/>} label="hot dogs" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "real bacon pieces")}/>} label="real bacon pieces" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "beef")}/>} label="beef" />
                    <FormControlLabel control={<Checkbox color="grey" onChange={(event) => onBoxClick(event, "chicken breast")}/>} label="chicken breast" />
                  </div>
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="myfridge md:tw-w-[30%]">
          <h3 className='md:tw-text-[1.3rem]'>My Fridge</h3>
          <div className="current md:tw-w-[100%] tw-border-2 tw-border-[#C4C1A4] tw-rounded-[10px] tw-min-h-[60vh] tw-flex tw-flex-col tw-justify-between">
            <div className="list md:tw-px-4 md:tw-py-4 md:tw-flex md:tw-flex-wrap md:tw-gap-1">
            {ingredientList && ingredientList.map(ingredient => (<>
            <Button variant="outlined" startIcon={<DeleteIcon />} sx={{height:'30px'}} color='black' onClick={() => onClickDelete(ingredient.text)}>
              {ingredient.text}
            </Button></>
            ))}
            </div>
            <div className="submit md:tw-flex md:tw-justify-end tw-pb-2 tw-pr-2">
              <Link to="/results"><Button variant="contained" color='orange'>SUBMIT</Button></Link>
            </div>

           
          
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </ThemeProvider>
   
   
   
   
    </>
  );
}

export default App;
