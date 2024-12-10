const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//add user
exports.addUserController = async (req,res)=>{
    console.log("inside addUserController");
    const {username,email,password} = req.body
    try{
        const exisitingUser = await users.findOne({email})
        if(exisitingUser){
            res.status(406).json("User already exisit... Please Login")
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            // console.log(encryptedPassword);
            
            const newUser = new users({
                username,email,password:encryptedPassword,profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//login
exports.loginController = async (req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    try{
        const exisitingEmail = await users.findOne({email})
        if(exisitingEmail){
            let isUserPaswdMatch = await bcrypt.compare(password,exisitingEmail.password)
                if(isUserPaswdMatch || password==exisitingEmail.password){
                    const token = jwt.sign({userId:exisitingEmail._id},process.env.JWTPASSWORD)
                    res.status(200).json({user:exisitingEmail,token})
                }else{
                    res.status(404).json("Invalid Email / Password")
                }
        }else{
            res.status(404).json("Invalid Email / Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//edit user
exports.editUserController = async (req,res)=>{
    console.log("Inside editUserController");
    const {profilePic} = req.body
    const userId = req.userId
    try{
        const exisitingUser = await users.findById({_id:userId})
        exisitingUser.profilePic = profilePic
        await exisitingUser.save()
        res.status(200).json(exisitingUser)
    }catch(err){
        res.status(401).json(err)
    }
}