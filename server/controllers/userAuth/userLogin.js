import UserData from '../../models/userRegister.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const UserLoginPost= async(req, res)=>{
    

try{
    const {userEmail, userPassword}=req.body

    //Validation
    if(!userEmail||!userPassword){
        return(res.send({message:"All Fileds Required", status:400}));
    }

    //Existing User
    const existingUser=await UserData.findOne({userEmail:userEmail});
    if(!existingUser){
        return(res.send({message:"No Account with this Email Id", status:400}));
    }

    //Password Validation
    const passwordMatch=await bcrypt.compare(userPassword, existingUser.userPassword);
    if(!passwordMatch){
        return(res.send({message:"Invalid Credentials", status:400}));
    }

    const JWT_SECRET=process.env.jwtSecret
    const token=jwt.sign({id:existingUser._id}, JWT_SECRET,{expiresIn:3600});
    if(!token) throw Error ('Coudnt Sign the token')
    res.json({token,user:{id:existingUser._id,userEmail:existingUser.userEmail}});

}

catch(error){
    res.status(505).json({message:error.message})
}


}