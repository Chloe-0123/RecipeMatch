const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    userEmail: { type: String, unique: false },
    recipeId: { type: String, unique: false },
    recipeTitle: { type: String, unique: false },
    recipeImage: { type: String, unique: false },
  });

module.exports = mongoose.model("Recipe", RecipeSchema);