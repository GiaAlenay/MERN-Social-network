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

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const findUser= await User.findOne({email:email})
        if (!findUser) return res.status(400).json({msg:'User does not exist.'})

        const isMatch= await bcrypt.compare(password, findUser.password)
        if (!isMatch) return res.status(400).json({msg:'Invalid credentials'})

        const token=jwt.sign({id:findUser._id },process.env.JWT_SECRET)
        delete findUser.password
        res.status(201).json({token,findUser})
    } catch (error) {
        res.status(501).json({error:error.message})
    }
}