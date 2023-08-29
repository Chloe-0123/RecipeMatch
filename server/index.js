const express = require("express");
require('dotenv').config()
const PORT = process.env.PORT || 3001;
const axios = require('axios')
const app = express();



app.get('/api/recipes', async (req, res) => {
    try {
        const { ingredients } = req.query;
        const apiKey = '1978a1bb91a74a599f875577b2e96804';
        const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;
        const response = await axios.get(apiUrl);
        res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
});


app.get('/api/ingredients', async (req, res) => {
  try {
    console.log('went thru')
    const { ingredient } = req.query
    console.log(ingredient)
    const apiKey = '1978a1bb91a74a599f875577b2e96804';
    const apiUrl = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${ingredient}`
    const response = await axios.get(apiUrl)
    res.json(response.data)
    console.log(response.data)
  } catch (error) {
    console.error(error);
        res.status(500).json({ message: 'Server error while loading autocomplete ingredients' });
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});