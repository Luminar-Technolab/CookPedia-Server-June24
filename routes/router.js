const express = require('express')
const recipeController = require('../controllers/recipeController')
const testimonyController = require("../controllers/testimonyController")
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

//all recipes
router.get("/all-recipes",recipeController.getAllRecipeController)
//add-testmony
router.post("/add-testimony",testimonyController.addTestimonyController)
//add-user
router.post("/register",userController.addUserController)
//login
router.post("/login",userController.loginController)
//view single recipe
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getARecipeController)
//related recipe
router.get("/related-recipes",jwtMiddleware,recipeController.relatedRecipeController)

module.exports = router