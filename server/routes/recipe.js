const express = require("express");
const router = express.Router();
const apiController = require('../controllers/api')

router.get("/recipes", apiController.getRecipe);
router.post("/ingredients", apiController.getIngredients);
router.get("/recipeInfo", apiController.getInfo);




module.exports = router;