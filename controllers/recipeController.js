const recipes = require('../models/recipeModel')

//get all recipes
exports.getAllRecipeController = async (req,res)=>{
    console.log("Inside getAllRecipeController");
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }catch(err){
        res.status(401).json(err)
    }
}

//getRecipe - authorised user
exports.getARecipeController = async (req,res)=>{
    console.log("Inside getARecipeController");
    //get dynamic values from url
    const {id} = req.params

    try{
        const recipeDetails = await recipes.findById({_id:id})
        res.status(200).json(recipeDetails)
    }catch(err){
        res.status(401).json(err)
    }
    
}

//related recipe
exports.relatedRecipeController = async(req,res)=>{
    console.log("Inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try{
        const allRelatedRecipes = await recipes.find({cuisine})
        res.status(200).json(allRelatedRecipes)
    }catch(err){
        res.status(401).json(err)
    }
}