const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    userEmail: { type: String, unique: false },
    recipeId: { type: String, unique: true },
    recipeTitle: { type: String, unique: true },
    recipeImage: { type: String, unique: true },
  });

module.exports = mongoose.model("Recipe", RecipeSchema);