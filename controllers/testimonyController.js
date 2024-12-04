const testimonials = require("../models/testimonyModel")

//add testimony
exports.addTestimonyController = async (req,res)=>{
    console.log("Inside addTestimonyController");
    const {name,email,message} = req.body

    try{
        const newTestimony = new testimonials({
            name,email,message
        })
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
    
}