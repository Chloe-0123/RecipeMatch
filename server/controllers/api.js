const fetch = require('node-fetch'); 

exports.getRecipe = async (req, res) => {

    try {
        const { ingredients } = req.query;
        const apiKey = process.env.API_KEY
        const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }

}

exports.getIngredients = async (req, res) => {

    try {
        console.log('went thru')
        const { ingredient } = req.query
        console.log(ingredient)
        const apiKey = process.env.API_KEY
        const apiUrl = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${ingredient}&number=5`
        const response = await fetch(apiUrl)
        res.json(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error);
            res.status(500).json({ message: 'Server error while loading autocomplete ingredients' });
      }
}

exports.getInfo = async (req, res) => {

    try {
        console.log('FIND INFO')
        const { id } = req.query
        console.log(id)
        const apiKey = process.env.API_KEY
        const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        res.json(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error);
            res.status(500).json({ message: 'Server error while loading autocomplete ingredients' });
      }
}