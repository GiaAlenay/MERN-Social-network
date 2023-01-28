import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from '../models/User.js'

export const register=async(req,res)=>{
    try {
        const {firstname,
            lastname,
            email,
            password,
            picturePath,
            location,
            ocuppation}=req.body;
    //ecriptar password
    const salt=await bcrypt.genSalt()
    const hashPassword=await bcrypt.hash(password,salt)
    
    const newUser= new User({
            firstname,
            lastname,
            email,
            password:hashPassword,
            picturePath,
            location,
            ocuppation
    })

    const savedUser=await newUser.save()
    res.status(201).json(savedUser)

    } catch (error) {
    res.status(501).json({error:error.message})
    }
}