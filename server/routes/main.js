const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { ensureAuth } = require("../middleware/auth")
const recipeController = require("../controllers/recipe")

router.get("/signUp", authController.getSignup);
router.post("/signUp", authController.postSignup);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/recipe", recipeController.getRecipe)
router.post("/recipe", recipeController.saveRecipe)


module.exports = router;