import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { response } from "express";

// login user
const loginUser = async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn't Exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}




///token creation

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


//register User
const RegisterUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const EmailExists = await UserModel.findOne({email});
        if(EmailExists){
            return res.json({success:false,message:"User Aldready Exist"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }

        //password lenght greater than 8 
        if(password.lenght<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hasing the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            name:name,
            email:email,
            password:hashPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id) 
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}


export {loginUser,RegisterUser}