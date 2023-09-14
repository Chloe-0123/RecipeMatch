const Recipe = require('../models/Recipe')


exports.saveRecipe = async (req, res) => {
    console.log(req.body.id)

    const newRecipe = new Recipe({
        userEmail: req.body.userEmail,
        recipeId: req.body.recipeId,
        recipeTitle: req.body.recipeTitle,
        recipeImage: req.body.recipeImage
    })

    try {
        newRecipe.save()
        return res.status(201).json(newRecipe);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
},

exports.getRecipe = async (req, res) => {
    console.log(req.query)
    const userEmail = req.query.userEmail
   
    try {
        const recipes = await Recipe.find({ userEmail }).exec();

        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

    
